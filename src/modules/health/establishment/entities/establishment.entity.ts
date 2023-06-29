import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, Index, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core'
import { Directorship } from '@modules/health/directorship/entities/directorship.entity'
import { WorkRelation } from '@modules/health/medical-worker/entities/work-relation.entity'
import { IsOptional } from 'class-validator'

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

  @IsOptional()
  @ManyToOne({ entity: () => Directorship, eager: true })
  directorship: Directorship
}
