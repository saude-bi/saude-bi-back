import { AuditedEntity } from '@libs/types/entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Dashboard } from '@modules/business-intelligence/dashboard/entities/dashboard.entity'

@Entity()
export class DashboardCategory extends AuditedEntity {
  @OneToMany({
    entity: () => Dashboard,
    mappedBy: (dashboard) => dashboard.category
  })
  dashboards = new Collection<Dashboard>(this)

  @Property()
  name: string
}
