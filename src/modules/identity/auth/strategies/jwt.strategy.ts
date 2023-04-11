import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserService } from '@modules/identity/user/user.service'
import { DecodedJwt } from '@modules/identity/types'
import { AppConfig } from '@modules/app-config/app-config.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: AppConfig, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.security.jwtSecret
    })
  }

  async validate(jwt: DecodedJwt) {
    const user = await this.userService.findOne(jwt.username)

    if (!user) {
      throw new ForbiddenException()
    }

    return user
  }
}
