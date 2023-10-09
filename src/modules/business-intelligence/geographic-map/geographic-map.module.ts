import { Module } from '@nestjs/common'
import { GeographicDataSourceService } from './geographic-data-source.service'
import { GeographicDataSourceController } from './geographic-data-source.controller'
import { GeographicDataSource } from './entities/geographic-data-source.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature([GeographicDataSource])],
  controllers: [GeographicDataSourceController],
  providers: [GeographicDataSourceService],
  exports: [GeographicDataSourceService]
})
export class GeographicDataSourceModule {}
