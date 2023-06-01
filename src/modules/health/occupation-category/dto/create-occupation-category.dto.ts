import { IsString } from 'class-validator'

export class CreateOccupationCategoryDto {
  @IsString()
  name: string
}
