import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    HttpModule,
    TerminusModule,
    ScheduleModule.forRoot(),
    MikroOrmModule.forRoot(),
    IdentityModule,
    DashboardModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
        HOST: Joi.string().required(),
        MODE: Joi.string().required(),
        JWT_SECRET: Joi.string().required()
      })
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: (await redisStore({ url: 'redis://redis:6379', ttl: 5 })) as unknown as CacheStore
      }),
      isGlobal: true
    })
  ]
})
export class AppModule {}
