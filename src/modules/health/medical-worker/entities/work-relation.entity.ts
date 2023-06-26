import { AuditedEntity } from '@libs/types/entity'
import { Entity, ManyToOne, Unique } from '@mikro-orm/core'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'
import { Occupation } from '@modules/health/occupation/entities/occupation.entity'
import { MedicalWorker } from './medical-worker.entity'

@Entity()
@Unique({ properties: ['worker', 'occupation', 'establishment'] })
export class WorkRelation extends AuditedEntity {
  @ManyToOne(() => MedicalWorker)
  worker: MedicalWorker

  @ManyToOne(() => Occupation, { eager: true })
  occupation: Occupation

  @ManyToOne(() => Establishment, { eager: true })
  establishment: Establishment
}
