import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserFindAllQuery } from './dto/user-filters.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      password: await hash(user.password, 10)
    })

    await this.userRepository.persistAndFlush(newUser)

    return newUser
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ id }, { populate: ['medicalWorker'] })
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username }, { populate: ['medicalWorker'] })
  }

  async findAll(query: UserFindAllQuery): Promise<PaginationResponse<User>> {
    const [result, total] = await this.userRepository.findAndCount(
      { username: new RegExp(query.username, 'i') },
      getPaginationOptions(query)
    )
    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id)
    wrap(existingUser).assign(updatedUser)

    await this.userRepository.persistAndFlush(existingUser)
    return existingUser
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id)
    await this.userRepository.removeAndFlush(user)

    return !!user
  }
}
