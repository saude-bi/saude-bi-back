import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  MatchConditions,
  PureAbility
} from '@casl/ability'
import { User } from '@modules/identity/user/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Action, AppAbility, Subjects } from './types'

const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>
    )

    if (user.isAdmin) {
      can(Action.Manage, 'all')
    } else {
      cannot(Action.Read, 'all')
    }

    can(Action.Read, User, ({ username }) => username === user.username)

    return build({
      detectSubjectType: (item) => item.constructor as unknown as ExtractSubjectType<Subjects>,
      conditionsMatcher: lambdaMatcher
    })
  }
}
