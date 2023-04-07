import { Req, Controller, HttpCode, Post, UseGuards, HttpStatus, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Jwt, RequestWithUser } from '../types'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthUser } from './decorators/auth-user.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('Identity')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async me(@AuthUser() currentUser: User): Promise<User> {
    return { ...currentUser, password: undefined }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() request: RequestWithUser): Promise<Jwt> {
    return await this.authService.login(request.user)
  }
}
