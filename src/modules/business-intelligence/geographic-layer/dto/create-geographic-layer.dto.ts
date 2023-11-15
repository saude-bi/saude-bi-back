import { IsNumber, IsString } from 'class-validator'

export class CreateGeographicLayerDto {
  @IsNumber()
  source: number

  @IsString()
  params: string

  @IsString()
  name: string
}
