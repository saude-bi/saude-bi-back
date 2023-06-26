import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateDashboardDto {
  @IsArray()
  establishmentsWithAccess: number[]

  @IsNumber()
  dataSource: number

  @IsNumber()
  category: number

  @IsNumber()
  metabaseId: number

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  establishmentPropertyName?: string
}
