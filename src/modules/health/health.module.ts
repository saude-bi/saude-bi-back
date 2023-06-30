import { Module } from '@nestjs/common'
import { EstablishmentModule } from './establishment/establishment.module'
import { MedicalWorkerModule } from './medical-worker/medical-worker.module'
import { OccupationCategoryModule } from './occupation-category/occupation-category.module'
import { OccupationModule } from './occupation/occupation.module'
import { DirectorshipModule } from './directorship/directorship.module'

@Module({
  imports: [
    OccupationModule,
    EstablishmentModule,
    DirectorshipModule,
    MedicalWorkerModule,
    OccupationCategoryModule
  ]
})
export class HealthModule {}
