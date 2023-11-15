import { Module } from '@nestjs/common'
import { DashboardCategoryModule } from './dashboard-category/dashboard-category.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { DataSourceModule } from './data-source/data-source.module'
import { DataModule } from './data/data.module'
import { GeographicDataSourceModule } from './geographic-data-source/geographic-data-source.module'
import { GeographicLayerModule } from './geographic-layer/geographic-layer.module'
import { GeographicMapModule } from './geographic-map/geographic-map.module'

@Module({
  imports: [DataModule, DataSourceModule, DashboardCategoryModule, DashboardModule, GeographicDataSourceModule, GeographicLayerModule, GeographicMapModule]
})
export class BusinessIntelligenceModule {}
