import { Injectable } from '@nestjs/common';
import { City } from '@city/models';
import { Logger } from '@logger/services';
import { WeatherApiCurrent, WeatherApiForecast } from './interfaces';
import { DynamicService } from './services';

@Injectable()
export class WeatherAPIService {
  constructor(private readonly dynamicService: DynamicService, private readonly logger: Logger) {}

  public fetchForecast(cities: City[]): Promise<WeatherApiForecast[]> | undefined {
    this.logger.debug(`Received cities to fetch forecast: ${JSON.stringify(cities)}`);

    if (cities.length) {
      const weatherService = this.dynamicService.getDynamicService();
      return weatherService.fetchForecast(cities);
    }
  }

  public fetchCurrent(cities: City[]): Promise<WeatherApiCurrent[]> | undefined {
    this.logger.debug(`Received cities to fetch current weather: ${JSON.stringify(cities)}`);

    if (cities.length) {
      const weatherService = this.dynamicService.getDynamicService();
      return weatherService.fetchCurrent(cities);
    }
  }
}
