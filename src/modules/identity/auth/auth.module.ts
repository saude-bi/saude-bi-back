import { AppConfig } from '@modules/app-config/app-config.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CaslAbilityFactory } from './casl/casl-ability.factory'
import { PoliciesGuard } from './casl/check-policies.decorator'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, CaslAbilityFactory, PoliciesGuard],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [AppConfig],
      useFactory: async (config: AppConfig) => ({
        secret: config.security.jwtSecret,
        signOptions: {
          expiresIn: '24h'
        }
      })
    })
  ],
  exports: [AuthService, CaslAbilityFactory]
})
export class AuthModule {}
