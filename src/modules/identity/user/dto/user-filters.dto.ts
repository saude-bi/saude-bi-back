import { PaginationQuery } from '@libs/types/pagination'
import { IsOptional, IsString } from 'class-validator'

export class UserFindAllQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  username?: string
}
