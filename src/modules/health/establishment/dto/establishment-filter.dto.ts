import { PaginationQuery } from '@libs/types/pagination'
import { IsOptional, IsString } from 'class-validator'

export class EstablishmentFindAllQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  name?: string
}
