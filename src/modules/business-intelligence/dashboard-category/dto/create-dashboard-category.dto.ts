import { IsString } from 'class-validator'

export class CreateDashboardCategoryDto {
  @IsString()
  name: string
}
