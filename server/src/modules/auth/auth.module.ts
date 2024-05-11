import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '@user/user.module';
import { AuthResolver } from './auth.resolver';
import { RefreshToken } from './models/refresh-token.model';
import { AuthService, TokenService } from './services';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({}), SequelizeModule.forFeature([RefreshToken])],
  providers: [TokenService, AuthService, AuthResolver, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
