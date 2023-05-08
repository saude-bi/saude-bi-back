import { PartialType } from '@nestjs/mapped-types'
import { CreateMedicalWorkerDto } from './create-medical-worker.dto'

export class UpdateMedicalWorkerDto extends PartialType(CreateMedicalWorkerDto) {}
