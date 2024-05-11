import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  BadRequestException,
  ArgumentsHost,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { ValidationError } from 'sequelize';
import { Logger } from '@logger/services';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  public catch(exception: Error, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      this.logger.error(exception.stack);

      if (this.isErrorWhitelisted(exception)) {
        throw exception;
      }

      const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      exception.message =
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Something bad happened on server. Try again later!'
          : exception.message;

      throw new HttpException(exception.message, status);
    }
  }

  private isErrorWhitelisted(exception: Error): boolean {
    return (
      exception instanceof BadRequestException ||
      exception instanceof ForbiddenException ||
      exception instanceof UnauthorizedException ||
      exception instanceof ValidationError
    );
  }
}
