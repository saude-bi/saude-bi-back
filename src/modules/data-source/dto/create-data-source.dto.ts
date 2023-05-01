import { IsOptional, IsString, IsUrl } from 'class-validator'
import { DataSourceCredentials } from '../entities/data-source.entity'

export class CreateDataSourceDto {
  @IsString()
  name: string

  @IsString()
  @IsUrl()
  url: string

  @IsOptional()
  credentials?: DataSourceCredentials
}
