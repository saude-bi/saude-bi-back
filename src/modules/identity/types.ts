export type UserInfo = {
  username: string
  isAdmin: boolean
}

export interface RequestWithUser extends Request {
  user: UserInfo
}

export type Jwt = { access_token: string }
export interface DecodedJwt extends UserInfo {
  iat: number
  exp: number
}
