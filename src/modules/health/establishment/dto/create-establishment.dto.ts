import { IsNumber, IsString } from 'class-validator'

export class CreateEstablishmentDto {
  @IsString()
  cnes: string

  @IsString()
  name: string

  @IsNumber()
  directorship?: number
}
