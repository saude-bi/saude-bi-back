import { AuditedEntity } from '@libs/types/entity'
import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKeyType,
  Property,
  Unique
} from '@mikro-orm/core'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'
import { Occupation } from '@modules/health/occupation/entities/occupation.entity'
import { User } from '@modules/identity/user/entities/user.entity'

export type Gender = 'male' | 'female' | 'other'

@Entity()
export class MedicalWorker extends AuditedEntity {
  @OneToOne()
  user: User

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
    mappedBy: (workRelation) => workRelation.worker
  })
  workRelations = new Collection<WorkRelation>(this)
}

// TODO make worker and occupation unique
@Entity()
class WorkRelation extends AuditedEntity {
  @ManyToOne()
  worker: MedicalWorker

  @ManyToOne()
  occupation: Occupation

  @OneToMany({
    entity: () => WorkingEstablishment,
    mappedBy: (workingEstablishment) => workingEstablishment.workRelation
  })
  workingEstablishments = new Collection<WorkingEstablishment>(this)
}

@Entity()
class WorkingEstablishment {
  @ManyToOne({ primary: true, eager: true })
  workRelation: WorkRelation

  @ManyToOne({ primary: true })
  establishment: Establishment;

  [PrimaryKeyType]?: [number, number]
}
