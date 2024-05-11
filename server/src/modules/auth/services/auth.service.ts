import { UnauthorizedException, Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlContext } from '@common';
import * as bcrypt from 'bcrypt';
import { ServerConfig } from '@config/interfaces';
import { Logger } from '@logger/services';
import { UserService } from '@user/user.service';
import { TokenService } from './token.service';
import { AuthOutput, SignInInput, SignUpInput, TokensDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async signUp(input: SignUpInput, context: GqlContext): Promise<AuthOutput> {
    const user = await this.userService.create({ ...input });

    this.logger.debug('Generating tokens...');
    const tokens = await this.tokenService.generateToken(user.id, user.roles);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    this.setTokensIntoCookies(tokens, context);

    return {
      authenticated: true,
    };
  }

  public async signIn(input: SignInInput, context: GqlContext): Promise<AuthOutput> {
    const user = await this.userService.findOne({ email: input.email });
    const isPasswordsEqual = await bcrypt.compare(input.password, user?.password ?? '');

    if (!user || !isPasswordsEqual) {
      throw new ForbiddenException(`Wrong credentials!`);
    }

    this.logger.debug('Generating tokens...');
    const tokens = await this.tokenService.generateToken(user.id, user.roles);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    this.setTokensIntoCookies(tokens, context);

    return {
      authenticated: true,
    };
  }

  public async logout(userId: number, context: GqlContext): Promise<AuthOutput> {
    const user = await this.userService.findOne({ id: userId });

    if (!user) {
      throw new ForbiddenException('Wrong credentials!');
    }

    await this.tokenService.removeToken(user.id);
    this.deleteTokensFromCookies(context);

    return {
      authenticated: false,
    };
  }

  public async refresh(userId: number, refreshToken: string, context: GqlContext): Promise<AuthOutput> {
    const user = await this.userService.findOne({ id: userId });
    const tokenFromDatabase = await this.tokenService.findToken({ userId });
    const isRefreshTokensEqual = await bcrypt.compare(refreshToken, tokenFromDatabase?.token ?? '');

    if (!user || !tokenFromDatabase || !isRefreshTokensEqual) {
      throw new UnauthorizedException('Access Denied');
    }

    this.logger.debug(`Generating tokens...`);
    const tokens = await this.tokenService.generateToken(user.id, user.roles);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    this.setTokensIntoCookies(tokens, context);

    return {
      authenticated: true,
    };
  }

  private setTokensIntoCookies(tokens: TokensDto, context: GqlContext): void {
    const jwtTokensConfig = this.configService.get<ServerConfig['jwtTokens']>('jwtTokens');

    this.logger.debug(`Setting tokens into cookies...`);
    context.res.cookie(jwtTokensConfig.accessTokenCookieName, tokens.accessToken, {
      httpOnly: true,
      maxAge: jwtTokensConfig.accessTokenExpire,
    });

    context.res.cookie(jwtTokensConfig.refreshTokenCookieName, tokens.refreshToken, {
      httpOnly: true,
      maxAge: jwtTokensConfig.refreshTokenExpire,
    });
  }

  private deleteTokensFromCookies(context: GqlContext): void {
    const jwtTokensConfig = this.configService.get<ServerConfig['jwtTokens']>('jwtTokens');

    this.logger.debug(`Deleting tokens from cookies...`);
    context.res.clearCookie(jwtTokensConfig.accessTokenCookieName);
    context.res.clearCookie(jwtTokensConfig.refreshTokenCookieName);
  }
}
