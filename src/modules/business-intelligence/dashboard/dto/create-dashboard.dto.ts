import { IsArray, IsNumber, IsString } from 'class-validator'

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
}
