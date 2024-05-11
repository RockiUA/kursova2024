import { ApolloDriver } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpExceptionFilter, formatError } from '@common';
import { redisStore } from 'cache-manager-redis-yet';
import { GqlAccessTokenGuard } from '@auth/guards';
import { serverConfig } from '@config/server.config';
import { DatabaseModule } from '@database/database.module';
import { LoggingInterceptor } from '@logger/interceptors';
import { LoggerModule } from '@logger/logger.module';
import { RolesGuard } from '@role/guards';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => serverConfig],
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: Number(configService.get<string>('REDIS_PORT')),
          },
          password: configService.get<string>('REDIS_PASSWORD'),
        }),
      }),
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
        autoSchemaFile: 'schema.gql',
        formatError,
        cors: {
          origin: configService.get<string[]>('allowedOrigins'),
          credentials: true,
        },
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: GqlAccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ServiceModule {}
