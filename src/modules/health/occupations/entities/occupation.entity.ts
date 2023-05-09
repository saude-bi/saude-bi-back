import { AuditedEntity } from '@libs/types/entity'
import { Entity, Index, Property, Unique } from '@mikro-orm/core'

@Entity()
export class Occupation extends AuditedEntity {
  @Property()
  name: string

  @Unique()
  @Index()
  @Property()
  cbo: string
}
