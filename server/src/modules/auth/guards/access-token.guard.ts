import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@auth/decorators';
import { Logger } from '@logger/services';

@Injectable()
export class GqlAccessTokenGuard extends AuthGuard('jwt-access') {
  constructor(private readonly reflector: Reflector, private readonly logger: Logger) {
    super();
  }

  public getRequest(context: ExecutionContext): Request {
    this.logger.debug(`Invoking GqlAccessTokenGuard.getRequest.`);
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.debug(`Invoking GqlAccessTokenGuard.canActivate.`);

    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      this.logger.debug(`Resolver or his method is decorated with @Public decorator, access granted.`);
      return true;
    }

    this.logger.debug('Checking access token.');

    return super.canActivate(context);
  }
}
