import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('Identity')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string, @AuthUser() currentUser: User) {
    if (username !== currentUser.username) {
      throw new ForbiddenException()
    }

    return await this.userService.findOne(username)
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('username') username: string, @AuthUser() currentUser: User): Promise<void> {
    if (currentUser.username !== username) {
      throw new ForbiddenException()
    }

    await this.userService.remove(username)
  }
}
