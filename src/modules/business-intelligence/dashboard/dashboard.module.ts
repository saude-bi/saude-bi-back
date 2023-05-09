import { Module } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardController } from './dashboard.controller'
import { Dashboard } from './entities/dashboard.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DataSourceModule } from '@modules/business-intelligence/data-source/data-source.module'
import { CategoryModule } from '@modules/business-intelligence/category/category.module'

@Module({
  imports: [MikroOrmModule.forFeature([Dashboard]), DataSourceModule, CategoryModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
