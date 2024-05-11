import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { serverConfig } from '@config/server.config';
import { Logger } from '@logger/services';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../interfaces';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly logger: Logger, readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies[serverConfig.jwtTokens.refreshTokenCookieName],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtTokens.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  public validate(request: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = (request?.cookies[serverConfig.jwtTokens.refreshTokenCookieName] as string)?.trim();

    this.logger.debug(`Payload by refresh accessed, user id = ${payload.sub}`);

    return {
      ...payload,
      refreshToken,
    };
  }
}
