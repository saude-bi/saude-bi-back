import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { GeographicDataSource } from '@modules/business-intelligence/geographic-data-source/entities/geographic-data-source.entity'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'

@Entity()
export class GeographicMap extends AuditedEntity {
  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @ManyToMany(() => GeographicDataSource, 'usedIn')
  layers = new Collection<GeographicDataSource>(this)

  @ManyToMany(() => Establishment)
  establishmentsWithAccess = new Collection<Establishment>(this)

  @Property()
  name: string
}
