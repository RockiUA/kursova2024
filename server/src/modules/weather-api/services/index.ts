import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherApiProvider } from '@config/interfaces';
import { Logger } from '@logger/services';
import { OpenWeatherService } from './open-weather.service';
import { WeatherApi } from '../interfaces/weather-api.interface';

@Injectable()
export class DynamicService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public getDynamicService(): WeatherApi {
    const weatherApiConfig = this.configService.get<WeatherApiProvider>('weatherAPI.provider');

    switch (weatherApiConfig) {
      case WeatherApiProvider.OPEN_WEATHER:
        this.logger.debug(`Switched to OpenWeather service.`);
        return new OpenWeatherService(this.httpService, this.configService, this.logger);

      default:
        throw new Error('Such service is not implemented!');
    }
  }
}
