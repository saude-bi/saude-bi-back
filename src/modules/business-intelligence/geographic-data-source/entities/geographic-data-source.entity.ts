import { AuditedEntity } from '@libs/types/entity'
import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { GeographicLayer } from '@modules/business-intelligence/geographic-layer/entities/geographic-layer.entity'

@Embeddable()
export class GeographicDataSourceCredentials {
  @Property()
  username: string

  @Property()
  password: string
}

@Entity()
export class GeographicDataSource extends AuditedEntity {
  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @Property()
  sourceUrl: string

  @OneToMany(() => GeographicLayer, 'source')
  layers = new Collection<GeographicLayer>(this)

  @Property()
  name: string

  @Embedded(() => GeographicDataSourceCredentials)
  credentials: GeographicDataSourceCredentials
}
