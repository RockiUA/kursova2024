import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { serverConfig } from '@config/server.config';
import { Logger } from '@logger/services';
import { JwtPayload } from '../interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly logger: Logger, readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies[serverConfig.jwtTokens.accessTokenCookieName],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtTokens.accessTokenSecret'),
    });
  }

  public validate(payload: JwtPayload): JwtPayload {
    this.logger.debug(`Payload by access token accessed, user id = ${payload.sub}`);
    return payload;
  }
}
