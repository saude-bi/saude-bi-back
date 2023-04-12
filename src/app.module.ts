import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { redisStore } from 'cache-manager-redis-store'
import { CacheModule, CacheStore } from '@nestjs/cache-manager'
import { DashboardModule } from '@modules/dashboard/dashboard.module'
import { IdentityModule } from '@modules/identity/identity.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { EstablishmentModule } from '@modules/establishment/establishment.module'
import { DataModule } from '@modules/data/data.module'
import { AppConfigModule } from '@modules/app-config/app-config.module'
import { AppConfig } from '@modules/app-config/app-config.service'

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
      store: (await redisStore({ url: 'redis://redis:6379', ttl: 5 })) as unknown as CacheStore
    }),
    isGlobal: true
  })
]

@Module({
  imports: [...helperModules, IdentityModule, DashboardModule, EstablishmentModule, DataModule]
})
export class AppModule {}
