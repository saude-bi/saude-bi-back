import { AuditedEntity } from '@libs/types/entity'
import { Entity, Index, Property, Unique } from '@mikro-orm/core'
import { Exclude, Expose } from 'class-transformer'

@Expose()
@Entity()
export class User extends AuditedEntity {
  @Unique()
  @Index()
  @Property()
  username: string

  @Property({ hidden: true })
  @Exclude()
  password: string

  @Property({ default: false })
  isAdmin: boolean
}
