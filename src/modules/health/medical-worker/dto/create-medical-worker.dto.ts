import { CreateUserDto } from '@modules/identity/user/dto/create-user.dto'
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator'
import { Gender } from '../entities/medical-worker.entity'

export class CreateMedicalWorkerDto {
  @IsObject()
  @IsOptional()
  user?: CreateUserDto

  @IsString()
  name: string

  @IsEnum(Gender)
  gender: Gender

  @IsString()
  cns: string

  @IsString()
  cpf: string
}
