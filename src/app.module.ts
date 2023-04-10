import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import Joi from 'joi'
import { redisStore } from 'cache-manager-redis-store'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { TerminusModule } from '@nestjs/terminus'
import { CacheModule, CacheStore } from '@nestjs/cache-manager'
import { DashboardModule } from '@modules/dashboard/dashboard.module'
import { HttpModule } from '@nestjs/axios'
import { IdentityModule } from '@modules/identity/identity.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { EstablishmentModule } from '@modules/establishment/establishment.module'
import { DataModule } from '@modules/data/data.module'

const helperModules = [
  HttpModule,
  TerminusModule,
  ScheduleModule.forRoot(),
  MikroOrmModule.forRoot(),
  LoggerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const isProduction = configService.get('MODE') === 'production'

      return {
        pinoHttp: {
          level: isProduction ? 'info' : 'debug',
          transport: isProduction
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
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    // TODO convert to nested config
    validationSchema: Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
      PORT: Joi.number().required(),
      HOST: Joi.string().required(),
      MODE: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      CNPJ_MANTENEDORA: Joi.string().required(),
      DOWNLOAD_PATH: Joi.string().required()
    })
  }),
  CacheModule.registerAsync({
    useFactory: async () => ({
      store: (await redisStore({ url: 'redis://redis:6379', ttl: 5 })) as unknown as CacheStore
    }),
    isGlobal: true
  })
]

@Module({
  controllers: [AppController],
  imports: [...helperModules, IdentityModule, DashboardModule, EstablishmentModule, DataModule]
})
export class AppModule {}
