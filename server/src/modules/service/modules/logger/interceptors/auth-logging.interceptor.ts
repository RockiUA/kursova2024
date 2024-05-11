import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@logger/services';

@Injectable()
export class AuthLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const requestId = uuidv4();

      const message = `[GraphQL Auth Request ${requestId}]: [${parentType}] [${fieldName}] invoked.`;
      this.logger.http(message);

      return next.handle().pipe(tap({ next: (): void => this.loggingResponse(requestId, context) }));
    }

    return next.handle();
  }

  private loggingResponse(requestId: string, context: ExecutionContext): void {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const parentType = info.parentType.name;
    const fieldName = info.fieldName;

    const message = `[GraphQL Auth Response ${requestId}]: [${parentType}] [${fieldName}] responded.`;
    this.logger.http(message);
  }
}
