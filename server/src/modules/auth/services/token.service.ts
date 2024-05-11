import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { WhereOptions } from 'sequelize';
import { ServerConfig } from '@config/interfaces';
import { Logger } from '@logger/services';
import { Role } from '@role/models';
import { Roles } from '@role/roles.enum';
import { TokensDto } from '../dto';
import { RefreshToken } from '../models/refresh-token.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenRepository: typeof RefreshToken,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async findToken(filter: WhereOptions<RefreshToken>): Promise<RefreshToken | null> {
    const response = await this.refreshTokenRepository.findOne({
      where: { ...filter },
    });

    return response?.dataValues;
  }

  public async generateToken(userId: number, roles: Role[]): Promise<TokensDto> {
    const jwtTokensConfig = this.configService.get<ServerConfig['jwtTokens']>('jwtTokens');

    this.logger.debug('Generating payload...');
    const payload = {
      sub: userId,
      roles: roles?.map((item) => item.name) ?? [Roles.USER],
    };

    this.logger.debug('Generating access token...');
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtTokensConfig.accessTokenSecret,
      expiresIn: jwtTokensConfig.accessTokenExpire,
    });

    this.logger.debug('Generating refresh token...');
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtTokensConfig.refreshTokenSecret,
      expiresIn: jwtTokensConfig.refreshTokenExpire,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userId: number, token: string): Promise<void> {
    const salt = this.configService.get<number>('jwtTokens.hashingSalt');
    const hashedToken = await bcrypt.hash(token, salt);
    const tokenData = await this.refreshTokenRepository.findOne({ where: { userId } });

    if (tokenData) {
      this.refreshTokenRepository.update({ token: hashedToken }, { where: { userId } });
      return;
    }

    this.refreshTokenRepository.create({ token: hashedToken, userId });
  }

  public removeToken(userId: number): Promise<number> {
    return this.refreshTokenRepository.destroy({ where: { userId } });
  }
}
