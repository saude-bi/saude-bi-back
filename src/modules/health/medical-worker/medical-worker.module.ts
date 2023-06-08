import { Module } from '@nestjs/common'
import { MedicalWorkerService } from './medical-worker.service'
import { MedicalWorkerController } from './medical-worker.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MedicalWorker } from './entities/medical-worker.entity'
import { UserModule } from '@modules/identity/user/user.module'

@Module({
  imports: [MikroOrmModule.forFeature([MedicalWorker]), UserModule],
  controllers: [MedicalWorkerController],
  providers: [MedicalWorkerService]
})
export class MedicalWorkerModule {}
