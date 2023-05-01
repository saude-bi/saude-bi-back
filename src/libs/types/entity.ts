import { PrimaryKey, Property } from '@mikro-orm/core'

export class AuditedEntity {
  @PrimaryKey()
  id: number

  @Property()
  created: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updated: Date = new Date()
}
