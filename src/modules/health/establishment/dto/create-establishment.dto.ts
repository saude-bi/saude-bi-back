import { Directorship } from '@modules/health/directorship/entities/directorship.entity'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateEstablishmentDto {
  @IsString()
  cnes: string

  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  directorship?: Directorship
}
