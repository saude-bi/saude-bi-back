import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import request, { SuperAgentTest } from 'supertest'
import { setupFixture } from './utils'
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs'
import { repositoryMockFactory } from './mocks'
import { IdentityModule } from '@modules/identity/identity.module'
import { User } from '@modules/identity/entities/user.entity'
import { CreateUserDto } from '@modules/identity/dto/create-user.dto'
import { ConfigModule } from '@nestjs/config'
import { hash } from 'bcrypt'

describe('Product Module (e2e)', () => {
  let app: INestApplication
  let agent: SuperAgentTest
  let server: any
  let userRepository: ReturnType<typeof repositoryMockFactory>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          dbName: 'testdb',
          type: 'postgresql',
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts']
        }),
        IdentityModule,
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [() => ({ JWT_SECRET: 'hunter2' })]
        })
      ]
    })
      .overrideProvider(getRepositoryToken(User))
      .useFactory({ factory: repositoryMockFactory })
      .compile()

    app = moduleFixture.createNestApplication()
    setupFixture(app)

    await app.init()

    userRepository = moduleFixture.get(getRepositoryToken(User))

    server = app.getHttpServer()
    agent = request.agent(server)
  })

  afterAll(async () => {
    await app.close()
    server.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /auth', () => {
    const createUserDto: CreateUserDto = { username: 'testuser', password: 'hunter2' }

    it('should forbid login when user does not exist', async () => {
      await agent.post('/auth').send(createUserDto).expect(HttpStatus.FORBIDDEN)
    })

    it('should forbid login on incorrect password', async () => {
      const hashedUserDto = { ...createUserDto, password: await hash('hunter5', 10) }
      userRepository.findOne.mockResolvedValueOnce(hashedUserDto)

      await agent.post('/auth').send(createUserDto).expect(HttpStatus.FORBIDDEN)
    })

    it('should return JWT on succesful login', async () => {
      const hashedUserDto = { ...createUserDto, password: await hash(createUserDto.password, 10) }

      userRepository.findOne.mockResolvedValue(hashedUserDto)

      const jwt = (await agent.post('/auth').send(createUserDto)).body
      expect(jwt).toHaveProperty('access_token')
    })
  })

  describe('GET /auth', () => {
    it('should error when unauthenticated', async () => {
      await agent.get('/auth').expect(HttpStatus.UNAUTHORIZED)
    })

    it('should return user info when authenticated', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'hunter2' }
      const hashedUserDto = { ...createUserDto, password: await hash(createUserDto.password, 10) }

      userRepository.findOne.mockResolvedValueOnce(hashedUserDto)

      const jwt = (await agent.post('/auth').send(createUserDto)).body.access_token
      const response = await agent
        .get('/auth')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(HttpStatus.OK)

      expect(response.body).toHaveProperty('username')
      expect(response.body).not.toHaveProperty('password')
      expect(response.body.username).toBe(createUserDto.username)
    })
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'hunter2' }
      const user = (await agent.post('/users').send(createUserDto).expect(HttpStatus.CREATED)).body

      expect(user).toMatchObject({ username: createUserDto.username })
    })
  })

  describe('GET /users/:username', () => {
    const createUserDto: CreateUserDto = { username: 'fakeuser', password: 'hunter2' }
    let hashedUserDto: CreateUserDto
    let jwt: string = 'dfsfsdafa'

    beforeAll(async () => {
      hashedUserDto = { ...createUserDto, password: await hash(createUserDto.password, 10) }
      userRepository.findOne.mockResolvedValue(hashedUserDto)

      jwt = (await agent.post('/auth').send(createUserDto)).body.access_token
    })

    it('should error when unauthenticated', async () => {
      await agent.get(`/users/${createUserDto.username}`).expect(HttpStatus.UNAUTHORIZED)
    })

    it('should forbid trying to find another user while authenticated', async () => {
      await agent
        .get(`/users/anotheruser`)
        .set('Authorization', `Bearer ${jwt}`)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should show authenticated user', async () => {
      const user: User = (
        await agent
          .get(`/users/${createUserDto.username}`)
          .set('Authorization', `Bearer ${jwt}`)
          .expect(HttpStatus.OK)
      ).body
      expect(user.username).toBe(createUserDto.username)
    })
  })

  describe('DELETE /users/:username', () => {
    const createUserDto: CreateUserDto = { username: 'fakeuser', password: 'hunter2' }
    let hashedUserDto: CreateUserDto
    let jwt: string = 'dfsfsdafa'

    beforeAll(async () => {
      hashedUserDto = { ...createUserDto, password: await hash(createUserDto.password, 10) }
      userRepository.findOne.mockResolvedValue(hashedUserDto)

      jwt = (await agent.post('/auth').send(createUserDto)).body.access_token
    })

    it('should error when not authenticated', async () => {
      await agent.delete('/users/fakeuser').expect(HttpStatus.UNAUTHORIZED)
    })

    it('should forbid trying to delete a user different from the authenticated user', async () => {
      userRepository.findOne.mockResolvedValueOnce(hashedUserDto)
      await agent
        .delete('/users/anotheruser')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should be able to delete the current user', async () => {
      userRepository.findOne.mockResolvedValueOnce(hashedUserDto)
      await agent
        .delete(`/users/${createUserDto.username}`)
        .set('Authorization', `Bearer ${jwt}`)
        .expect(HttpStatus.NO_CONTENT)
    })
  })
})
