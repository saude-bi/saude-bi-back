import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CheckPolicies, PoliciesGuard } from '../auth/casl/check-policies.decorator'
import { Action } from '../auth/casl/types'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('Identity')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability, params: { username: string }) => {
    const user = new User()
    user.username = params.username

    return ability.can(Action.Read, user)
  })
  @ApiBearerAuth()
  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findOne(username)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':username')
  async remove(@Param('username') username: string, @AuthUser() currentUser: User): Promise<void> {
    if (currentUser.username !== username) {
      throw new ForbiddenException()
    }

    const couldRemove = await this.userService.remove(username)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
