import { Module } from '@nestjs/common'
import { DashboardCategoryService } from './dashboard-category.service'
import { DashboardCategoryController } from './dashboard-category.controller'

@Module({
  controllers: [DashboardCategoryController],
  providers: [DashboardCategoryService],
  exports: [DashboardCategoryService]
})
export class DashboardCategoryModule {}
