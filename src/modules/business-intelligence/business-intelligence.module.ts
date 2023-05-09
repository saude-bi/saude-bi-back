import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { DataSourceModule } from './data-source/data-source.module'
import { DataModule } from './data/data.module'

@Module({
  imports: [DataModule, DataSourceModule, CategoryModule, DashboardModule]
})
export class BusinessIntelligenceModule {}
