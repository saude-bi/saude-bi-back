import { AuditedEntity } from '@libs/types/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { GeographicDataSource } from '@modules/business-intelligence/geographic-data-source/entities/geographic-data-source.entity'

@Entity()
export class GeographicLayer extends AuditedEntity {
  @ManyToOne(() => GeographicDataSource)
  source: GeographicDataSource

  @Property()
  endpoint: string

  @Property()
  name: string
}
