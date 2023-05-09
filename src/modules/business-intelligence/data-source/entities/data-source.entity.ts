import { AuditedEntity } from '@libs/types/entity'
import { Collection, Embeddable, Embedded, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Dashboard } from '@modules/business-intelligence/dashboard/entities/dashboard.entity'

@Embeddable()
export class DataSourceCredentials {
  @Property()
  login: string

  @Property()
  password: string
}

export abstract class DataSource extends AuditedEntity {
  @Property()
  name: string

  @Property()
  url: string

  @Embedded({ nullable: true })
  credentials: DataSourceCredentials | null
}

@Entity()
export class DashboardDataSource extends DataSource {
  @OneToMany({
    entity: () => Dashboard,
    mappedBy: (dashboard) => dashboard.dataSource
  })
  dashboards = new Collection<Dashboard>(this)
}
