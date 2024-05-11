import { BadRequestException, Injectable } from '@nestjs/common';
import { GetCityInput } from '@city/dto';
import { CityService } from '@city/services';
import { Logger } from '@logger/services';
import { UserService } from '@user/user.service';
import { WeatherApiCurrent, WeatherApiForecast } from '@weather-api/interfaces';
import { WeatherAPIService } from '@weather-api/weather-api.service';
import { WeatherCacheService } from './cache.service';
import { FetchForecastInput } from '../dto';
import { CachingPrefixes } from '../interfaces';
import { City } from '../../city/models';

@Injectable()
export class WeatherService {
  constructor(
    private readonly userService: UserService,
    private readonly weatherAPIService: WeatherAPIService,
    private readonly weatherCacheService: WeatherCacheService,
    private readonly cityService: CityService,
    private readonly logger: Logger,
  ) {}

  public async fetchForecastByUser(userId: number, options: FetchForecastInput): Promise<WeatherApiForecast[]> {
    const user = await this.userService.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('There is no such user!');
    }

    const [notFound, found] = await this.weatherCacheService.findForecast({
      entities: user.cities,
      fetchOptions: options,
    });

    const forecasts = await this.fetchForecasts(notFound, options);
    return found.concat(forecasts);
  }

  public async fetchCurrentWeatherByUser(userId: number): Promise<WeatherApiCurrent[]> {
    const user = await this.userService.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('There is no such user!');
    }

    const [notFound, found] = await this.weatherCacheService.findCurrentWeather(user.cities);
    const weathers = await this.fetchCurrentWeather(notFound);
    return found.concat(weathers);
  }

  public async fetchForecastByCity(filter: GetCityInput, options: FetchForecastInput): Promise<WeatherApiForecast[]> {
    const candidate = await this.cityService.findOne(filter);

    if (!candidate) {
      throw new BadRequestException('City could not be found!');
    }

    const [notFound, found] = await this.weatherCacheService.findForecast({
      entities: [candidate] as City[],
      fetchOptions: options,
    });

    const forecast = await this.fetchForecasts(notFound, options);
    return found.concat(forecast);
  }

  public async fetchCurrentWeatherByCity(filter: GetCityInput): Promise<WeatherApiCurrent[]> {
    const candidate = await this.cityService.findOne(filter);

    if (!candidate) {
      throw new BadRequestException('City could not be found!');
    }

    const [notFound, found] = await this.weatherCacheService.findCurrentWeather([candidate] as City[]);
    const weather = await this.fetchCurrentWeather(notFound);
    return found.concat(weather);
  }

  private async fetchForecasts(notFound: City[], options: FetchForecastInput): Promise<WeatherApiForecast[]> {
    const fetchedForecasts = await this.weatherAPIService.fetchForecast(notFound);

    if (fetchedForecasts) {
      this.weatherCacheService.set({
        entities: fetchedForecasts,
        prefix: CachingPrefixes.FORECAST,
      });

      const forecasts = fetchedForecasts.map((item) => ({
        ...item,
        forecasts: item.forecasts.slice(0, options.days),
      }));

      this.logger.debug(`Mapped value, after slicing by days option: ${JSON.stringify(forecasts)}`);

      return forecasts;
    }

    return [];
  }

  private async fetchCurrentWeather(notFound: City[]): Promise<WeatherApiCurrent[]> {
    const weathers = await this.weatherAPIService.fetchCurrent(notFound);

    if (weathers) {
      this.weatherCacheService.set({
        entities: weathers,
        prefix: CachingPrefixes.CURRENT,
      });

      return weathers;
    }

    return [];
  }
}
