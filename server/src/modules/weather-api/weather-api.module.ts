import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamicService } from './services';
import { OpenWeatherService } from './services/open-weather.service';
import { WeatherAPIService } from './weather-api.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherAPIService, DynamicService, OpenWeatherService],
  exports: [WeatherAPIService],
})
export class WeatherAPIModule {}
