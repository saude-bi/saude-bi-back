import { PaginationQuery } from '@libs/types/pagination'
import { IsOptional, IsString } from 'class-validator'

export class GeographicLayerFindAllQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  name?: string
}
