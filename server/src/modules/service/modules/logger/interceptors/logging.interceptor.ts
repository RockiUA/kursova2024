import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { Logger } from '@logger/services';
import { IS_STANDARD_LOGGING_IGNORED } from '../decorators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger, private readonly reflector: Reflector) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnored = this.reflector.getAllAndOverride(IS_STANDARD_LOGGING_IGNORED, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isIgnored) {
      return next.handle();
    }

    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const body = info.fieldNodes[0]?.loc?.source?.body;
      const message = `[GraphQL Request]: [${parentType}] [${fieldName}] ${JSON.stringify(body)}`;

      this.logger.http(message);

      return next.handle().pipe(
        tap({
          next: (body: unknown): void => this.loggingResponse(body, context),
        }),
      );
    }

    return next.handle();
  }

  private loggingResponse(body: unknown, context: ExecutionContext): void {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const parentType = info.parentType.name;
    const fieldName = info.fieldName;
    const message = `[GraphQL Response]: [${parentType}] [${fieldName}] ${JSON.stringify(body)}`;

    this.logger.http(message);
  }
}
