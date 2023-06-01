import { AuditedEntity } from '@libs/types/entity'
import { Entity, Index, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { OccupationCategory } from '@modules/health/occupation-category/entities/occupation-category.entity'

@Entity()
export class Occupation extends AuditedEntity {
  @Property()
  name: string

  @Unique()
  @Index()
  @Property()
  cbo: string

  @ManyToOne()
  category: OccupationCategory
}
