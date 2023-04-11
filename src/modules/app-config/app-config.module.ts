import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { AppConfig } from './app-config.service'

@Global()
@Module({
  providers: [AppConfig],
  exports: [AppConfig],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().hostname().required(),
        DB_PORT: Joi.number().port().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PORT: Joi.number().port().required(),
        HOST: Joi.string().hostname().required(),
        MODE: Joi.string().valid('dev', 'production').required(),
        JWT_SECRET: Joi.string().required(),
        MAINTAINER_CNPJ: Joi.string().length(14).required(),
        DOWNLOAD_PATH: Joi.string().required()
      })
    })
  ]
})
export class AppConfigModule {}
