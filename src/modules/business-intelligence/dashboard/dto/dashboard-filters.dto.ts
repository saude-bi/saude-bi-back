import { PaginationQuery } from '@libs/types/pagination'
import { IsNumber, IsOptional } from 'class-validator'

export class DashboardFindAllQuery extends PaginationQuery {
  @IsNumber()
  @IsOptional()
  category?: number
}
