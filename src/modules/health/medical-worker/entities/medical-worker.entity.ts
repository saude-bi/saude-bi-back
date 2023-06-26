import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, Index, OneToMany, OneToOne, Property, Unique } from '@mikro-orm/core'
import { User } from '@modules/identity/user/entities/user.entity'
import { WorkRelation } from './work-relation.entity'

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

@Entity()
export class MedicalWorker extends AuditedEntity {
  @OneToOne(() => User, (user) => user.medicalWorker, { nullable: true, owner: true })
  user?: User

  @Property()
  name: string

  @Property()
  gender: Gender

  @Unique()
  @Index()
  @Property()
  cns: string

  @Property()
  cpf: string

  @OneToMany({
    entity: () => WorkRelation,
    mappedBy: (workRelation) => workRelation.worker,
    eager: true
  })
  workRelations = new Collection<WorkRelation>(this)
}
