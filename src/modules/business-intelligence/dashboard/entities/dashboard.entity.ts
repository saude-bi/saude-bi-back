import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core'
import { DashboardCategory } from '@modules/business-intelligence/dashboard-category/entities/dashboard-category.entity'
import { DashboardDataSource } from '@modules/business-intelligence/data-source/entities/data-source.entity'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'

@Entity()
export class Dashboard extends AuditedEntity {
  @ManyToOne(() => DashboardDataSource)
  dataSource: DashboardDataSource

  @ManyToOne(() => DashboardCategory)
  category: DashboardCategory

  @ManyToMany(() => Establishment)
  establishmentsWithAccess = new Collection<Establishment>(this)

  @Property()
  metabaseId: number

  @Property({ nullable: true })
  establishmentPropertyName?: string

  @Property()
  name: string

  @Property()
  public: boolean
}
