import { AuditedEntity } from '@libs/types/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { DashboardDataSource } from '@modules/business-intelligence/data-source/entities/data-source.entity'

@Entity()
export class Dashboard extends AuditedEntity {
  @ManyToOne(() => DashboardDataSource)
  dataSource: DashboardDataSource

  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @Property()
  metabaseId: number

  @Property()
  name: string
}
