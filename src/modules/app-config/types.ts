export type DatabaseConfig = {
  host: string
  port: number
  username: string
  password: string
  name: string
}

export type AppMode = 'dev' | 'production'
export type AppConfig = {
  host: string
  port: number
  mode: AppMode
}

export type SecurityConfig = {
  jwtSecret: string
}

export type SynchronizationConfig = {
  maintainerCnpj: string
  downloadPath: string
}
