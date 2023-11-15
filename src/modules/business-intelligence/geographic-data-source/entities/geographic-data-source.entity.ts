import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { GeographicLayer } from '@modules/business-intelligence/geographic-layer/entities/geographic-layer.entity'
import { GeographicMap } from '@modules/business-intelligence/geographic-map/entities/geographic-map.entity'

@Entity()
export class GeographicDataSource extends AuditedEntity {
  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @Property()
  sourceUrl: string

  @ManyToMany(() => GeographicMap, 'layers', { owner: true })
  usedIn = new Collection<GeographicMap>(this)

  @OneToMany(() => GeographicLayer, 'source')
  layers = new Collection<GeographicLayer>(this)

  @Property()
  name: string
}
