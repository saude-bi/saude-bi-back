import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateGeographicMapDto {
  @IsNumber()
  category: number

  @IsArray()
  layers: number[]

  @IsArray()
  establishmentsWithAccess: number[]

  @IsString()
  name: string

  @IsBoolean()
  public: boolean
}
