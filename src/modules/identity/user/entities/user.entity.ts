import { Audited } from '@libs/types/entity'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Exclude, Expose } from 'class-transformer'

@Expose()
@Entity()
export class User extends Audited {
  @PrimaryKey()
  username: string

  @Property({ hidden: true })
  @Exclude()
  password: string

  @Property()
  isAdmin: boolean
}
