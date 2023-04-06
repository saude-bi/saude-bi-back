import { AuditedEntity } from '@libs/types/entity'
import { Entity, Property } from '@mikro-orm/core'
import { Exclude, Expose } from 'class-transformer'

@Expose()
@Entity()
export class User extends AuditedEntity {
  @Property({ unique: true })
  username: string

  @Property({ hidden: true })
  @Exclude()
  password: string
}
