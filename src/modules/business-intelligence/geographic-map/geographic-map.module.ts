import { Module } from '@nestjs/common'
import { GeographicMapService } from './geographic-map.service'
import { GeographicMapController } from './geographic-map.controller'
import { GeographicMap } from './entities/geographic-map.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DashboardCategoryModule } from '../dashboard-category/dashboard-category.module'

@Module({
  imports: [MikroOrmModule.forFeature([GeographicMap]), DashboardCategoryModule],
  controllers: [GeographicMapController],
  providers: [GeographicMapService],
  exports: [GeographicMapService]
})
export class GeographicMapModule {}
