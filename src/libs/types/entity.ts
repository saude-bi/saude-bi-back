import { PrimaryKey, Property } from '@mikro-orm/core'

export class AuditedEntity {
  @PrimaryKey()
  id: number

  @Property({ lazy: true })
  created: Date = new Date()

  @Property({ onUpdate: () => new Date(), lazy: true })
  updated: Date = new Date()
}
