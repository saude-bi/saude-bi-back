import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core'
import { GeographicDataSource } from '@modules/business-intelligence/geographic-data-source/entities/geographic-data-source.entity'
import { GeographicMap } from '@modules/business-intelligence/geographic-map/entities/geographic-map.entity'

@Entity()
export class GeographicLayer extends AuditedEntity {
  @ManyToOne(() => GeographicDataSource)
  source: GeographicDataSource

  @ManyToMany(() => GeographicMap, "layers", { owner: true })
  usedIn = new Collection<GeographicMap>(this)

  @Property()
  params: string

  @Property()
  establishmentPropertyName?: string

  @Property()
  name: string
}
