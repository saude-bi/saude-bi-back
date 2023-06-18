import { RequestWithUser } from '@modules/identity/types'
import { UserService } from '@modules/identity/user/user.service'
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from './casl-ability.factory'
import { AppAbility } from './types'

interface IPolicyHandler {
  handle(ability: AppAbility, params: Record<string, any>): boolean
}

type PolicyHandlerCallback = IPolicyHandler['handle']
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

export const CHECK_POLICIES_KEY = 'check_policy'
export const CheckPolicies = (handler: PolicyHandler) => SetMetadata(CHECK_POLICIES_KEY, handler)

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandler = this.reflector.get<PolicyHandler>(
      CHECK_POLICIES_KEY,
      context.getHandler()
    )

    if (!policyHandler) {
      return false
    }

    const params = context.getArgByIndex(0).params
    const request: RequestWithUser = context.switchToHttp().getRequest()
    const user = await this.userService.findOneByUsername(request.user.username)

    if (!user) {
      return false
    }

    const ability = this.caslAbilityFactory.createForUser(user)
    return this.execPolicyHandler(policyHandler, ability, params)
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    params: Record<string, any>
  ) {
    if (typeof handler === 'function') {
      return handler(ability, params)
    }
    return handler.handle(ability, params)
  }
}
