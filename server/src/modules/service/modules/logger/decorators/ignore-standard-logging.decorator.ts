import { SetMetadata } from '@nestjs/common';

export const IS_STANDARD_LOGGING_IGNORED = 'standardLoggingIgnored';

export const IgnoreStandardLoggingInterceptor = () => SetMetadata(IS_STANDARD_LOGGING_IGNORED, true);
