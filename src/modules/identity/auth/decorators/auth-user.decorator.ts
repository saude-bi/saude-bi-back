import { RequestWithUser, UserInfo } from '@modules/identity/types'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext): UserInfo => {
  const request: RequestWithUser = ctx.switchToHttp().getRequest()
  return request.user
})
