import { AuditedEntity } from '@libs/types/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'

@Entity()
export class Geomap extends AuditedEntity {
  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @Property()
  sourceUrl: string

  @Property()
  name: string
}
