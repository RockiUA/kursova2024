import { Module } from '@nestjs/common';
import { CityModule } from '@city/city.module';
import { UserModule } from '@user/user.module';
import { WeatherAPIModule } from '@weather-api/weather-api.module';
import { WeatherService, WeatherCacheService } from './services';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [UserModule, CityModule, WeatherAPIModule],
  providers: [WeatherResolver, WeatherService, WeatherCacheService],
})
export class WeatherModule {}
