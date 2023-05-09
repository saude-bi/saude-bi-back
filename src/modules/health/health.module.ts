import { Module } from '@nestjs/common'
import { EstablishmentModule } from './establishment/establishment.module'
import { MedicalWorkerModule } from './medical-worker/medical-worker.module'
import { OccupationCategoryModule } from './occupation-category/occupation-category.module'
import { OccupationsModule } from './occupations/occupations.module'

@Module({
  imports: [OccupationsModule, EstablishmentModule, MedicalWorkerModule, OccupationCategoryModule]
})
export class HealthModule {}
