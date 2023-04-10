import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '24h'
        }
      })
    })
  ],
  exports: [AuthService, CaslAbilityFactory]
})
export class AuthModule {}
