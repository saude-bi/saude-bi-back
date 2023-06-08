import { AuditedEntity } from '@libs/types/entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Category } from '@modules/business-intelligence/category/entities/category.entity'
import { DashboardDataSource } from '@modules/business-intelligence/data-source/entities/data-source.entity'

@Entity()
export class Dashboard extends AuditedEntity {
  @ManyToOne(() => DashboardDataSource)
  dataSource: DashboardDataSource

  @ManyToOne(() => Category)
  category: Category

  @Property()
  metabaseId: number

  @Property()
  name: string
}