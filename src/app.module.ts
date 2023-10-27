import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { redisStore } from 'cache-manager-redis-store'
import { CacheModule, CacheStore } from '@nestjs/cache-manager'
import { IdentityModule } from '@modules/identity/identity.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AppConfigModule } from '@modules/app-config/app-config.module'
import { AppConfig } from '@modules/app-config/app-config.service'
import { HealthModule } from '@modules/health/health.module'
import { BusinessIntelligenceModule } from '@modules/business-intelligence/business-intelligence.module'

const helperModules = [
  AppConfigModule,
  MikroOrmModule.forRoot(),
  LoggerModule.forRootAsync({
    imports: [AppConfigModule],
    inject: [AppConfig],
    useFactory: async (config: AppConfig) => {
      return {
        pinoHttp: {
          level: config.isProduction ? 'info' : 'debug',
          transport: config.isProduction
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true
                }
              }
        }
      }
    }
  }),
  CacheModule.registerAsync({
    useFactory: async () => ({
      store: (await redisStore({ 
        url: `redis:/${process.env.REDIS_HOST}:${process.env.RED_PORT}`,
        ttl: 5
      })) as unknown as CacheStore
    }),
    isGlobal: true
  })
]

@Module({
  imports: [...helperModules, IdentityModule, HealthModule, BusinessIntelligenceModule]
})
export class AppModule {}
