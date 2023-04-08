import { Audited } from '@libs/types/entity'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Establishment extends Audited {
  @PrimaryKey()
  cnes: string

  @Property()
  name: string
}
