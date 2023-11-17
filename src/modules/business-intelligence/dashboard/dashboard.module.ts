import { Module } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardController } from './dashboard.controller'
import { IdentityModule } from '@modules/identity/identity.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    IdentityModule,
    JwtModule.register({
      secret: 'irrelevant',
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService]
})
export class DashboardModule {}
