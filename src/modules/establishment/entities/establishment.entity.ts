import { AuditedEntity } from '@libs/types/entity'
import { Entity, Index, Property, Unique } from '@mikro-orm/core'

@Entity()
export class Establishment extends AuditedEntity {
  @Unique()
  @Index()
  @Property()
  cnes: string

  @Property()
  name: string
}
