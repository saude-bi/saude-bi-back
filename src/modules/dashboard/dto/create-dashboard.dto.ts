import { IsNumber, IsString } from 'class-validator'

export class CreateDashboardDto {
  @IsNumber()
  dataSource: number

  @IsNumber()
  category: number

  @IsNumber()
  metabaseId: number

  @IsString()
  name: string
}
