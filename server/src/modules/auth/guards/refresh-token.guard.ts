import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Logger } from '@logger/services';

@Injectable()
export class GqlRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(private readonly logger: Logger) {
    super();
  }

  public getRequest(context: ExecutionContext): Request {
    this.logger.debug(`Invoking GqlRefreshTokenGuard.getRequest.`);
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
