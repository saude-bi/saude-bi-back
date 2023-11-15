import { IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateGeographicDataSourceDto {
  @IsNumber()
  category: number

  @IsString()
  @IsUrl()
  sourceUrl: string

  @IsString()
  name: string
}
