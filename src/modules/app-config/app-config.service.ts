import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig, AppMode, DatabaseConfig, SecurityConfig, SynchronizationConfig } from './types'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get app(): AppConfig {
    return {
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('PORT'),
      mode: this.configService.get<AppMode>('MODE')
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
}
