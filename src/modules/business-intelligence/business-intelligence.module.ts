import { Module } from '@nestjs/common'
import { DashboardCategoryModule } from './dashboard-category/dashboard-category.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { DataSourceModule } from './data-source/data-source.module'
import { DataModule } from './data/data.module'

@Module({
  imports: [DataModule, DataSourceModule, DashboardCategoryModule, DashboardModule]
})
export class BusinessIntelligenceModule {}
