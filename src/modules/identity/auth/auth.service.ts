import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { Jwt, UserInfo } from '../types'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username)

    if (!user) {
      throw new ForbiddenException()
    }

    const passwordMatches = await this.passwordMatches(password, user.password)

    if (!passwordMatches) {
      throw new ForbiddenException()
    }

    return user
  }

  async passwordMatches(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
  }

  async login(user: UserInfo): Promise<Jwt> {
    const payload: UserInfo = { username: user.username }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
