import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from '@auth/models/refresh-token.model';
import { City, UserCity } from '@city/models';
import { Logger } from '@logger/services';
import { Role, UserRole } from '@role/models';
import { User } from '@user/models/user.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [Logger, ConfigService],
      useFactory: async (logger: Logger, configService: ConfigService) => ({
        dialect: 'postgres',
        logging: (message) => logger.debug(message),
        host: configService.get<string>('POSTGRES_HOST'),
        port: Number(configService.get<string>('POSTGRES_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        models: [User, RefreshToken, Role, UserRole, City, UserCity],
      }),
    }),
  ],
})
export class DatabaseModule {}
