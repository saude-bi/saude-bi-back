export type DatabaseConfig = {
  host: string
  port: number
  username: string
  password: string
  name: string
}

export type ApplicationMode = 'dev' | 'production'
export type ApplicationConfig = {
  host: string
  port: number
  mode: ApplicationMode
}

export type SecurityConfig = {
  jwtSecret: string
}

export type SynchronizationConfig = {
  maintainerCnpj: string
  downloadPath: string
}
