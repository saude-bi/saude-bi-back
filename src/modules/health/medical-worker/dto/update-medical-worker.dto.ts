import { PartialType } from '@nestjs/mapped-types'
import { OmitType } from '@nestjs/swagger'
import { CreateMedicalWorkerDto } from './create-medical-worker.dto'

export class UpdateMedicalWorkerDto extends PartialType(
  OmitType(CreateMedicalWorkerDto, ['user'])
) {}
