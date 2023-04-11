import { Global, Module } from '@nestjs/common'
import { AppConfig } from './app-config.service'

@Global()
@Module({
  providers: [AppConfig],
  exports: [AppConfig]
})
export class AppConfigModule {}
