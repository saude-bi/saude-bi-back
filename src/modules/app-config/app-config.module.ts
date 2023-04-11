import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfig } from './app-config.service'

@Global()
@Module({
  providers: [AppConfig],
  imports: [ConfigModule],
  exports: [AppConfig]
})
export class AppConfigModule {}
