import { Module } from '@nestjs/common'
import { GeomapService } from './geomap.service'
import { GeomapController } from './geomap.controller'
import { Geomap } from './entities/geomap.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature([Geomap])],
  controllers: [GeomapController],
  providers: [GeomapService],
  exports: [GeomapService]
})
export class GeomapModule {}
