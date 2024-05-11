import { LoggerService } from '@nestjs/common';
import { logger } from '../helpers/winston';

export class Logger implements LoggerService {
  /**
   *  Write a 'log' level log.
   *  Will be marked as a 'debug' in a log files.
   */
  public log(message: string): void {
    logger.debug(message);
  }

  /**
   *  Write a 'http' level log.
   */
  public http(message: string): void {
    logger.http(message);
  }

  public error(message: string): void {
    logger.error(message);
  }

  public warn(message: string): void {
    logger.warn(message);
  }

  public debug(message: string): void {
    logger.debug(message);
  }
}
