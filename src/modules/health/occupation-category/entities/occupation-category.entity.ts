import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Occupation } from '@modules/health/occupation/entities/occupation.entity'

@Entity()
export class OccupationCategory extends AuditedEntity {
  @OneToMany({
    entity: () => Occupation,
    mappedBy: (occupation) => occupation.category
  })
  occupations = new Collection<Occupation>(this)

  @Property()
  name: string
}
