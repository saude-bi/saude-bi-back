import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'

@Entity()
export class Directorship extends AuditedEntity {
  @Property()
  name: string

  @Property()
  acronym: string

  @OneToMany({
    entity: () => Establishment,
    mappedBy: (establishment) => establishment.directorship
  })
  establishments = new Collection<Establishment>(this)
}
