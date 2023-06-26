import { IsNumber } from 'class-validator'

export class FindUrlQuery {
  @IsNumber()
  workRelation: number
}
