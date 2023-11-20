import { AuditedEntity } from '@libs/types/entity'
import { Collection, Embeddable, Embedded, Entity, OneToMany, Property } from '@mikro-orm/core'
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
  @Property()
  sourceUrl: string

  @OneToMany(() => GeographicLayer, 'source')
  layers = new Collection<GeographicLayer>(this)

  @Property()
  name: string

  @Embedded(() => GeographicDataSourceCredentials)
  credentials: GeographicDataSourceCredentials
}
