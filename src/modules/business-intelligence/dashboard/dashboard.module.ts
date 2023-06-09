import { Module } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardController } from './dashboard.controller'
import { Dashboard } from './entities/dashboard.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DataSourceModule } from '@modules/business-intelligence/data-source/data-source.module'
import { DashboardCategoryModule } from '@modules/business-intelligence/dashboard-category/dashboard-category.module'

@Module({
  imports: [MikroOrmModule.forFeature([Dashboard]), DataSourceModule, DashboardCategoryModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
