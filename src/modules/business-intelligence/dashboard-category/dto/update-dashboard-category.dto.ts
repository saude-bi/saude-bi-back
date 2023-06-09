import { PartialType } from '@nestjs/mapped-types'
import { CreateDashboardCategoryDto } from './create-dashboard-category.dto'

export class UpdateDashboardCategoryDto extends PartialType(CreateDashboardCategoryDto) {}
