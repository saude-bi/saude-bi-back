import { Module } from '@nestjs/common'
import { DataSourceService } from './data-source.service'
import { DataSourceController } from './data-source.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DashboardDataSource } from './entities/data-source.entity'

@Module({
  imports: [MikroOrmModule.forFeature([DashboardDataSource])],
  controllers: [DataSourceController],
  providers: [DataSourceService],
  exports: [DataSourceService]
})
export class DataSourceModule {}
