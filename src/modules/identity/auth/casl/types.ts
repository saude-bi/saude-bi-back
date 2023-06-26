import { InferSubjects, PureAbility } from '@casl/ability'
import { Dashboard } from '@modules/business-intelligence/dashboard/entities/dashboard.entity'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'
import { User } from '@modules/identity/user/entities/user.entity'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  List = 'list',
  Update = 'update',
  Delete = 'delete'
}

export type Subjects = InferSubjects<typeof User | typeof Establishment | typeof Dashboard> | 'all'
export type AppAbility = PureAbility<[Action, Subjects]>
