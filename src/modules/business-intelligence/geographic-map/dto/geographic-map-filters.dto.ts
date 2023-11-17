import { PaginationQuery } from '@libs/types/pagination'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class GeographicMapFindAllQuery extends PaginationQuery {
  @IsNumber()
  @IsOptional()
  category?: number

  @IsString()
  @IsOptional()
  name?: string
}
