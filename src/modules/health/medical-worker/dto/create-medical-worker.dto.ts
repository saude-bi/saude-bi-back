import { IsString } from 'class-validator'
import { Gender } from '../entities/medical-worker.entity'

export class CreateMedicalWorkerDto {
  @IsString()
  user: string

  @IsString()
  name: string

  @IsString()
  gender: Gender

  @IsString()
  cns: string

  @IsString()
  cpf: string
}
