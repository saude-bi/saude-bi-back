import { IsNumber, IsString } from 'class-validator'

export class CreateGeographicDataSourceDto {
  @IsNumber()
  category: number

  @IsString()
  name: string
}
