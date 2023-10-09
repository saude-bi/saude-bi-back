import { IsNumber, IsString } from 'class-validator'

export class CreateGeographicMapDto {
  @IsNumber()
  category: number

  @IsString()
  name: string
}
