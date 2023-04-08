import { randomUUID } from 'crypto'
import { PrimaryKey, Property } from '@mikro-orm/core'
import { IntersectionType } from '@nestjs/swagger'

export class AbstractEntity {
  @PrimaryKey()
  id: string = randomUUID()
}

export class Audited {
  @Property()
  created: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updated: Date = new Date()
}

export class AuditedEntity extends IntersectionType(AbstractEntity, Audited) {}
