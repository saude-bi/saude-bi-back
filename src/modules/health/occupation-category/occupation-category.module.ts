import { Module } from '@nestjs/common'
import { OccupationCategoryService } from './occupation-category.service'
import { OccupationCategoryController } from './occupation-category.controller'

@Module({
  controllers: [OccupationCategoryController],
  providers: [OccupationCategoryService]
})
export class OccupationCategoryModule {}
