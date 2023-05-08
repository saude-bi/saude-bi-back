import { Module } from '@nestjs/common'
import { MedicalWorkerService } from './medical-worker.service'
import { MedicalWorkerController } from './medical-worker.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MedicalWorker } from './entities/medical-worker.entity'

@Module({
  imports: [MikroOrmModule.forFeature([MedicalWorker])],
  controllers: [MedicalWorkerController],
  providers: [MedicalWorkerService]
})
export class MedicalWorkerModule {}
