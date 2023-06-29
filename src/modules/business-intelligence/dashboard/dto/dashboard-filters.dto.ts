import { PaginationQuery } from '@libs/types/pagination'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class DashboardFindAllQuery extends PaginationQuery {
  @IsNumber()
  @IsOptional()
  category?: number

  @IsString()
  @IsOptional()
  name?: string
}
