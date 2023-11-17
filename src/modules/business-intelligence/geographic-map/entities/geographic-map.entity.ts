import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { GeographicLayer } from '@modules/business-intelligence/geographic-layer/entities/geographic-layer.entity'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'

@Entity()
export class GeographicMap extends AuditedEntity {
  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @ManyToMany(() => GeographicLayer, 'usedIn')
  layers = new Collection<GeographicLayer>(this)

  @ManyToMany(() => Establishment)
  establishmentsWithAccess = new Collection<Establishment>(this)

  @Property()
  name: string

  @Property()
  public: boolean
}
