import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthService } from '../services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(username, password)
      return user
    } catch (e) {
      throw new ForbiddenException()
    }
  }
}
