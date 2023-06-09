import { Module } from '@nestjs/common'
import { DashboardCategoryService } from './dashboard-category.service'
import { DashboardCategoryController } from './dashboard-category.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DashboardCategory } from './entities/dashboard-category.entity'

@Module({
  imports: [MikroOrmModule.forFeature([DashboardCategory])],
  controllers: [DashboardCategoryController],
  providers: [DashboardCategoryService],
  exports: [DashboardCategoryService]
})
export class DashboardCategoryModule {}
