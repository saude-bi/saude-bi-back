import { Module } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardController } from './dashboard.controller'
import { Dashboard } from './entities/dashboard.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { DataSourceModule } from '@modules/business-intelligence/data-source/data-source.module'
import { DashboardCategoryModule } from '@modules/business-intelligence/dashboard-category/dashboard-category.module'
import { EstablishmentModule } from '@modules/health/establishment/establishment.module'
import { IdentityModule } from '@modules/identity/identity.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    MikroOrmModule.forFeature([Dashboard]),
    EstablishmentModule,
    DataSourceModule,
    DashboardCategoryModule,
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
