import { join } from 'path';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { serverConfig } from '@config/server.config';

/**
 * Function for creating transport configs, provided by Winston.
 * @param level - log level
 * @returns winston's transport config
 */
export function createTransportConfig(level: string): DailyRotateFileTransportOptions {
  return {
    filename: join(`${serverConfig.logger.loggingPath}`, '%DATE%', `%DATE%-${level}.log`),
    datePattern: serverConfig.logger.transport.datePattern,
    maxSize: serverConfig.logger.transport.maxSize,
    maxFiles: serverConfig.logger.transport.maxFiles,
    level,
  };
}
