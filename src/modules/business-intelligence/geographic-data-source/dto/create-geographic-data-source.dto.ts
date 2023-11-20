import { IsObject, IsString, IsUrl } from 'class-validator'
import { GeographicDataSourceCredentials } from '../entities/geographic-data-source.entity'

export class CreateGeographicDataSourceDto {
  @IsString()
  @IsUrl()
  sourceUrl: string

  @IsString()
  name: string

  @IsObject()
  credentials: GeographicDataSourceCredentials
}
