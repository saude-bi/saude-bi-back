import { IsNumber, IsString } from 'class-validator'

export class CreateGeographicLayerDto {
  @IsNumber()
  source: number

  @IsString()
  endpoint: string

  @IsString()
  name: string
}
