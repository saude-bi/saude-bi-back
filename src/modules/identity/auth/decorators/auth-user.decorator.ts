import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestWithUser, UserInfo } from '../types'

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext): UserInfo => {
  const request: RequestWithUser = ctx.switchToHttp().getRequest()
  return request.user
})
