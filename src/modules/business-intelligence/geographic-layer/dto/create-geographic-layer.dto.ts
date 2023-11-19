import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGeographicLayerDto {
  @IsNumber()
  source: number

  @IsString()
  params: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  establishmentPropertyName?: string
}
