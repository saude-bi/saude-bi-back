import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Dashboard } from '@modules/business-intelligence/dashboard/entities/dashboard.entity'

export abstract class DataSource extends AuditedEntity {
  @Property()
  name: string

  @Property()
  url: string

  @Property()
  secret: string
}

@Entity()
export class DashboardDataSource extends DataSource {
  @OneToMany({
    entity: () => Dashboard,
    mappedBy: (dashboard) => dashboard.dataSource
  })
  dashboards = new Collection<Dashboard>(this)
}
