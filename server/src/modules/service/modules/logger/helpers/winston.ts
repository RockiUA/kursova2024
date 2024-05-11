import { format, transports, createLogger } from 'winston';
import 'winston-daily-rotate-file';
import { createTransportConfig } from './transport';

export const logger = createLogger({
  level: 'debug',
  exitOnError: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.json(),
    format.printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`),
  ),
  defaultMeta: { service: 'server-logging-service' },
  transports: [
    new transports.DailyRotateFile(createTransportConfig('error')),
    new transports.DailyRotateFile(createTransportConfig('warn')),
    new transports.DailyRotateFile(createTransportConfig('http')),
    new transports.DailyRotateFile(createTransportConfig('debug')),
  ],
});
