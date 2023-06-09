import { IsNumber, IsString } from 'class-validator'

export class CreateOccupationDto {
  @IsString()
  name: string

  @IsString()
  cbo: string

  @IsNumber()
  category: number
}
