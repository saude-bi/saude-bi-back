import { IsString, IsUrl } from 'class-validator'

export class CreateDataSourceDto {
  @IsString()
  name: string

  @IsString()
  @IsUrl()
  url: string

  @IsString()
  secret: string
}
