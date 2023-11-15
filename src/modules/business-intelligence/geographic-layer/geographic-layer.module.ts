import { Module } from '@nestjs/common'
import { GeographicLayerService } from './geographic-layer.service'
import { GeographicLayerController } from './geographic-layer.controller'
import { GeographicLayer } from './entities/geographic-layer.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature([GeographicLayer])],
  controllers: [GeographicLayerController],
  providers: [GeographicLayerService],
  exports: [GeographicLayerService]
})
export class GeographicLayerModule {}
