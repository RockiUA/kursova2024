import { Global, Module } from '@nestjs/common';
import { Logger } from './services';

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
