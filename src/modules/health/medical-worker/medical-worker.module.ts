import { Module } from '@nestjs/common'
import { MedicalWorkerService } from './medical-worker.service'
import { MedicalWorkerController } from './medical-worker.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MedicalWorker } from './entities/medical-worker.entity'
import { UserModule } from '@modules/identity/user/user.module'
import { WorkRelation } from './entities/work-relation.entity'
import { EstablishmentModule } from '../establishment/establishment.module'
import { OccupationModule } from '../occupation/occupation.module'

@Module({
  imports: [
    MikroOrmModule.forFeature([MedicalWorker, WorkRelation]),
    UserModule,
    OccupationModule,
    EstablishmentModule
  ],
  controllers: [MedicalWorkerController],
  providers: [MedicalWorkerService]
})
export class MedicalWorkerModule {}
