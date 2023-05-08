import { PartialType } from '@nestjs/mapped-types'
import { CreateOccupationCategoryDto } from './create-occupation-category.dto'

export class UpdateOccupationCategoryDto extends PartialType(CreateOccupationCategoryDto) {}
