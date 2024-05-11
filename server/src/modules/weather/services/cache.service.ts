import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { City } from '@city/models';
import { Logger } from '@logger/services';
import { WeatherApiCurrent, WeatherApiForecast } from '@weather-api/interfaces';
import { CachedDataOptions, CachingPrefixes, CheckDateDifferenceArgs, FindForecastArgs } from '../interfaces';

@Injectable()
export class WeatherCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async findForecast(options: FindForecastArgs): Promise<[City[], WeatherApiForecast[]]> {
    const foundEntities: WeatherApiForecast[] = [];
    const notFoundEntities: City[] = [];
    const expire = this.configService.get<string>('forecastExpire');

    for (const entity of options.entities) {
      const cachedValue = await this.cacheManager.get<WeatherApiForecast>(
        `${CachingPrefixes.FORECAST}_${entity.name}_${entity.latitude}_${entity.longitude}`,
      );
      this.logger.debug(`Received value from cache: ${JSON.stringify(cachedValue)}`);

      const isCacheValid = await this.checkCacheValidity({
        cachedValue,
        expire: Number(expire),
        prefix: CachingPrefixes.FORECAST,
      });

      this.logger.debug(`Checking is cache valid = ${isCacheValid}`);

      if (isCacheValid) {
        this.logger.debug(`Slicing forecast by days: ${options.fetchOptions.days}`);
        cachedValue.forecasts = cachedValue.forecasts.slice(0, options.fetchOptions.days);
        foundEntities.push(cachedValue);
      } else {
        this.logger.debug(`Pushing into not found array...`);
        notFoundEntities.push(entity);
      }
    }

    return [notFoundEntities, foundEntities];
  }

  public async findCurrentWeather(entities: City[]): Promise<[City[], WeatherApiCurrent[]]> {
    const foundEntities: WeatherApiCurrent[] = [];
    const notFoundEntities: City[] = [];
    const expire = this.configService.get<string>('currentWeatherExpire');

    this.logger.debug(`Current weather expire value received, value = ${expire}`);

    for (const entity of entities) {
      const cachedValue = await this.cacheManager.get<WeatherApiCurrent>(
        `${CachingPrefixes.CURRENT}_${entity.name}_${entity.latitude}_${entity.longitude}`,
      );
      this.logger.debug(`Received value from cache: ${JSON.stringify(cachedValue)}`);

      const isCacheValid = await this.checkCacheValidity({
        cachedValue,
        expire: Number(expire),
        prefix: CachingPrefixes.CURRENT,
      });

      this.logger.debug(`Checking is cache valid = ${isCacheValid}`);

      if (isCacheValid) {
        this.logger.debug(`Pushing into found entities array...`);
        foundEntities.push(cachedValue);
      } else {
        this.logger.debug(`Pushing into not found array...`);
        notFoundEntities.push(entity);
      }
    }

    return [notFoundEntities, foundEntities];
  }

  public async set<T extends WeatherApiForecast | WeatherApiCurrent>(options: CachedDataOptions<T>): Promise<void> {
    if (options.entities) {
      for (const entity of options.entities) {
        const prefix = options.prefix;
        const city_name = entity.city.cityName;
        const latitude = entity.city.cityCoordinates.latitude;
        const longitude = entity.city.cityCoordinates.longitude;

        this.logger.debug(
          `Setting value ${JSON.stringify(entity)} by key: ${prefix}_${city_name}_${latitude}_${longitude}...`,
        );
        await this.cacheManager.set(`${prefix}_${city_name}_${latitude}_${longitude}`, entity);
      }
    }
  }

  public async delete<T extends WeatherApiForecast | WeatherApiCurrent>(options: CachedDataOptions<T>): Promise<void> {
    for (const entity of options.entities) {
      const prefix = options.prefix;
      const city_name = entity.city.cityName;
      const latitude = entity.city.cityCoordinates.latitude;
      const longitude = entity.city.cityCoordinates.longitude;

      this.logger.debug(
        `Deleting value ${JSON.stringify(entity)} by key: ${prefix}_${city_name}_${latitude}_${longitude}...`,
      );
      await this.cacheManager.del(`${prefix}_${city_name}_${latitude}_${longitude}`);
    }
  }

  public async reset(): Promise<void> {
    this.logger.debug('Dropping cache storage...');
    await this.cacheManager.reset();
  }

  private async checkCacheValidity<T extends WeatherApiForecast | WeatherApiCurrent>(
    args: CheckDateDifferenceArgs<T>,
  ): Promise<boolean> {
    const { cachedValue, prefix, expire } = args;

    if (!cachedValue) {
      this.logger.debug('Cached value not exists.');
      return false;
    }

    const dateDifference = new Date().getTime() - new Date(cachedValue.createdAt).getTime();
    const cacheDate = new Date(cachedValue.createdAt).getDate();
    const currentDate = new Date().getDate();

    this.logger.debug(`Date difference: ${dateDifference}, expire time: ${expire}`);

    if (dateDifference >= expire || cacheDate !== currentDate) {
      this.logger.debug('Deleting value from cache...');
      await this.delete<T>({ entities: [cachedValue], prefix });
      return false;
    }

    return true;
  }
}
