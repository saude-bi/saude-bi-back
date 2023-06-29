import { Module } from '@nestjs/common'
import { EstablishmentController } from './establishment.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Establishment } from './entities/establishment.entity'
import { EstablishmentService } from './services/establishment.service'
import { SynchronizationService } from './services/synchronization.service'
import { DataModule } from '@modules/business-intelligence/data/data.module'
import { Directorship } from '../directorship/entities/directorship.entity'

@Module({
  controllers: [EstablishmentController],
  providers: [EstablishmentService, SynchronizationService],
  imports: [MikroOrmModule.forFeature([Establishment]), DataModule, Directorship],
  exports: [EstablishmentService]
})
export class EstablishmentModule {}
