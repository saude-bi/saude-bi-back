import { PaginationQuery } from '@libs/types/pagination'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class GeographicLayerFindAllQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  name?: string
}

export class GetDataQuery {
  @IsNumber()
  workRelation: number
}
