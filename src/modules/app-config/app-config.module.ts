import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfigService } from './app-config.service'

@Global()
@Module({
  providers: [AppConfigService],
  imports: [ConfigModule],
  exports: [AppConfigService]
})
export class AppConfigServiceModule {}
