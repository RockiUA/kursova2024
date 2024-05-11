import { Module } from '@nestjs/common';
import { ServiceModule } from '@service/service.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { WeatherAPIModule } from './weather-api/weather-api.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ServiceModule, UserModule, AuthModule, RoleModule, CityModule, WeatherModule, WeatherAPIModule],
})
export class AppModule {}
