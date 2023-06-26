import { AuditedEntity } from '@libs/types/entity'
import { Entity, Index, OneToOne, Property, Unique } from '@mikro-orm/core'
import { MedicalWorker } from '@modules/health/medical-worker/entities/medical-worker.entity'
import { Exclude, Expose } from 'class-transformer'

@Expose()
@Entity()
export class User extends AuditedEntity {
  @Unique()
  @Index()
  @Property()
  username: string

  @Property({ hidden: true })
  @Exclude()
  password: string

  @Property({ default: false })
  isAdmin: boolean

  @OneToOne(() => MedicalWorker, (worker) => worker.user, { eager: true })
  medicalWorker?: MedicalWorker
}
