import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ApplicationConfig,
  ApplicationMode,
  DatabaseConfig,
  SecurityConfig,
  SynchronizationConfig
} from './types'

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  get app(): ApplicationConfig {
    return {
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('PORT'),
      mode: this.configService.get<ApplicationMode>('MODE')
    }
  }

  get db(): DatabaseConfig {
    return {
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      name: this.configService.get<string>('DB_NAME')
    }
  }

  get security(): SecurityConfig {
    return {
      jwtSecret: this.configService.get<string>('JWT_SECRET')
    }
  }

  get synchronization(): SynchronizationConfig {
    return {
      maintainerCnpj: this.configService.get<string>('MAINTAINER_CNPJ'),
      downloadPath: this.configService.get<string>('DOWNLOAD_PATH')
    }
  }

  get isProduction(): boolean {
    return this.app.mode === 'production'
  }
}
