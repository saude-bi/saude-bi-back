import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, Index, OneToMany, Property, Unique } from '@mikro-orm/core'
import { WorkRelation } from '@modules/health/medical-worker/entities/work-relation.entity'

@Entity()
export class Establishment extends AuditedEntity {
  @Unique()
  @Index()
  @Property()
  cnes: string

  @Property()
  name: string

  @OneToMany(() => WorkRelation, (workRelation) => workRelation.establishment)
  workRelations = new Collection<WorkRelation>(this)
}
