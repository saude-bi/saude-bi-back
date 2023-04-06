import { IsString, MinLength, NotContains } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @NotContains(' ')
  username: string

  @IsString()
  @MinLength(5)
  @NotContains(' ')
  password: string
}
