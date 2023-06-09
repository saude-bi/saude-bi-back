import { PaginationQuery } from '@libs/types/pagination'
import { IsOptional, IsString } from 'class-validator'

export class OccupationCategoryFindAllQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  name?: string
}
