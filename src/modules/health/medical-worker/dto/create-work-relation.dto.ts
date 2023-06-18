import { IsNumber } from 'class-validator'

export class CreateWorkRelationDto {
  @IsNumber()
  occupation: number

  @IsNumber()
  establishment: number
}
