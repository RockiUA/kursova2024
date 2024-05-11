import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City, UserCity } from './models';
import { CityResolver, UserCityResolver } from './resolvers';
import { CityService, UserCityService } from './services';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), SequelizeModule.forFeature([City, UserCity])],
  providers: [CityService, UserCityService, CityResolver, UserCityResolver],
  exports: [CityService, UserCityService],
})
export class CityModule {}
