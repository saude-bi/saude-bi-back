import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { User } from './entities/user.entity'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '24h'
          }
        }
      }
    })
  ]
})
export class IdentityModule {}
