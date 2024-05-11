import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { GqlContext } from '@common';
import { JwtPayload, JwtPayloadWithRefreshToken } from '@auth/interfaces';
import { IgnoreStandardLoggingInterceptor } from '@logger/decorators';
import { AuthLoggingInterceptor } from '@logger/interceptors';
import { CurrentUser } from './decorators';
import { Public } from './decorators';
import { AuthOutput, SignInInput, SignUpInput } from './dto';
import { GqlRefreshTokenGuard } from './guards';
import { AuthService } from './services';

@Resolver()
@IgnoreStandardLoggingInterceptor()
@UseInterceptors(new AuthLoggingInterceptor())
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthOutput)
  public signUp(@Args('input') input: SignUpInput, @Context() context: GqlContext): Promise<AuthOutput> {
    return this.authService.signUp(input, context);
  }

  @Public()
  @Mutation(() => AuthOutput)
  public signIn(@Args('input') input: SignInInput, @Context() context: GqlContext): Promise<AuthOutput> {
    return this.authService.signIn(input, context);
  }

  @Mutation(() => AuthOutput)
  public logout(@CurrentUser() user: JwtPayload, @Context() context: GqlContext): Promise<AuthOutput> {
    return this.authService.logout(user.sub, context);
  }

  @Public()
  @UseGuards(GqlRefreshTokenGuard)
  @Mutation(() => AuthOutput)
  public refresh(@CurrentUser() user: JwtPayloadWithRefreshToken, @Context() context: GqlContext): Promise<AuthOutput> {
    const { sub, refreshToken } = user;
    return this.authService.refresh(sub, refreshToken, context);
  }
}
