import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({ ...user, password: await hash(user.password, 10) })
    await this.userRepository.persistAndFlush(newUser)

    return newUser
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<User>> {
    const [result, total] = await this.userRepository.findAndCount({}, getPaginationOptions(query))
    return new PaginationResponse(query, total, result)
  }

  async update(username: string, updatedUser: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(username)
    wrap(existingUser).assign(updatedUser)

    await this.userRepository.persistAndFlush(existingUser)
    return existingUser
  }

  async remove(username: string): Promise<void> {
    const user = await this.findOne(username)
    await this.userRepository.removeAndFlush(user)
  }
}
