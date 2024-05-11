import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { GetCityInput } from '@city/dto';
import { City } from '@city/models';
import { Logger } from '@logger/services';
import {
  Units,
  Endpoint,
  OpenWeatherCurrentResponse,
  OpenWeatherFetcherConfigs,
  OpenWeatherForecastResponse,
  WeatherApiCurrent,
  WeatherApiForecast,
  OpenWeatherMappedForecast,
} from '../interfaces';
import { WeatherApi } from '../interfaces/weather-api.interface';

@Injectable()
export class OpenWeatherService implements WeatherApi {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async fetchForecast(cities: City[]): Promise<WeatherApiForecast[]> {
    const optionsFetcher: OpenWeatherFetcherConfigs = {
      endpoint: Endpoint.FORECAST,
      units: Units.METRIC,
    };

    try {
      const response = await Promise.all(
        cities.map((city) =>
          lastValueFrom(
            this.httpService
              .get<OpenWeatherForecastResponse>(this.generateLink(city, optionsFetcher))
              .pipe(map((item) => this.mapForecastCity(item, city))),
          ),
        ),
      );

      return this.transformForecastResponse(response);
    } catch {
      throw new BadRequestException('Failed to fetch forecast data!');
    }
  }

  public async fetchCurrent(cities: City[]): Promise<WeatherApiCurrent[]> {
    const optionsFetcher: OpenWeatherFetcherConfigs = {
      endpoint: Endpoint.WEATHER,
      units: Units.METRIC,
    };

    try {
      this.logger.debug(`Fetching data begins...`);
      const response = await Promise.all(
        cities.map((city) =>
          lastValueFrom(
            this.httpService
              .get<OpenWeatherCurrentResponse>(this.generateLink(city, optionsFetcher))
              .pipe(map((item) => this.mapCurrentWeatherCity(item, city))),
          ),
        ),
      );

      return this.transformCurrentResponse(response);
    } catch {
      throw new BadRequestException('Failed to fetch current weather data!');
    }
  }

  private transformForecastResponse(response: AxiosResponse<OpenWeatherForecastResponse>[]): WeatherApiForecast[] {
    const time = this.configService.get<string>('openWeather.forecastDayTime');

    const forecasts = response.map((item) => ({
      list: item.data.list,
      city: item.data.city,
    }));

    this.logger.debug(`First forecast mapping, formed list and city fields. Value: ${JSON.stringify(forecasts)}`);

    const filteredForecastsList = forecasts.map((item) => this.forecastListHandler(item, time));

    this.logger.debug(
      `Filtering forecast mapping, including only options time. Value: ${JSON.stringify(filteredForecastsList)}`,
    );

    const transformedResponse = filteredForecastsList.map((item) => ({
      createdAt: new Date().toJSON(),
      forecasts: item.list.map((item) => ({
        date: new Date(item.dt_txt).toJSON(),
        temperature: item.main.temp,
        temperatureFeelsLike: item.main.feels_like,
        weather: item.weather[0].main,
        weatherDescription: item.weather[0].description,
        weatherIcon: this.generateIconUrl(item.weather[0].icon),
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
      })),
      city: {
        id: item.city.id,
        cityName: item.city.name,
        cityCoordinates: {
          latitude: item.city.coord.lat,
          longitude: item.city.coord.lon,
        },
      },
    }));

    this.logger.debug(`Transformed response: ${JSON.stringify(transformedResponse)}`);
    return transformedResponse;
  }

  private transformCurrentResponse(response: AxiosResponse<OpenWeatherCurrentResponse>[]): WeatherApiCurrent[] {
    const weather = response.map((item) => ({ ...item.data }));

    this.logger.debug(`Getting data value from current weather response. Result: ${JSON.stringify(weather)}`);

    const transformedResponse: WeatherApiCurrent[] = weather.map((item) => ({
      createdAt: new Date().toJSON(),
      weather: {
        date: new Date().toJSON(),
        temperature: item.main.temp,
        temperatureFeelsLike: item.main.feels_like,
        weather: item.weather[0].main,
        weatherDescription: item.weather[0].description,
        weatherIcon: this.generateIconUrl(item.weather[0].icon),
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
      },
      city: {
        id: item.id,
        cityName: item.name,
        cityCoordinates: {
          latitude: item.coord.lat,
          longitude: item.coord.lon,
        },
      },
    }));

    this.logger.debug(`Transformed response: ${JSON.stringify(transformedResponse)}`);
    return transformedResponse;
  }

  private generateLink(city: GetCityInput, options: OpenWeatherFetcherConfigs): string {
    const baseUrl = this.configService.get<string>('openWeather.url');
    const apiKey = this.configService.get<string>('openWeather.apiKey');

    const { endpoint, units } = options;
    const { latitude, longitude } = city;

    const query = [`lat=${latitude}`, `lon=${longitude}`, `units=${units}`, `appid=${apiKey}`];
    const link = `${baseUrl}${endpoint}?${query.join('&')}`;

    this.logger.debug(`Generated fetch link: ${link}`);

    return link;
  }

  private generateIconUrl(icon: string): string {
    const url = this.configService.get<string>('openWeather.imageUrl');
    const size = this.configService.get<string>('openWeather.imageSize');
    const extension = this.configService.get<string>('openWeather.imageExtension');
    const link = `${url}/${icon}${size}.${extension}`;

    return link;
  }

  private forecastListHandler(item: OpenWeatherMappedForecast, time: string): OpenWeatherMappedForecast {
    const filteredData = {
      ...item,
      list: item.list.filter(
        (item) => item.dt_txt.includes(time) && new Date(item.dt_txt).getDate() !== new Date().getDate(),
      ),
    };

    if (filteredData.list.length < 5) {
      filteredData.list.push(item.list.at(-1));
    }

    return filteredData;
  }

  private mapCurrentWeatherCity(
    item: AxiosResponse<OpenWeatherCurrentResponse>,
    city: City,
  ): AxiosResponse<OpenWeatherCurrentResponse> {
    item.data.id = city.id;
    item.data.name = city.name;
    item.data.coord.lat = city.latitude;
    item.data.coord.lon = city.longitude;
    return item;
  }

  private mapForecastCity(
    item: AxiosResponse<OpenWeatherForecastResponse>,
    city: City,
  ): AxiosResponse<OpenWeatherForecastResponse> {
    item.data.city.id = city.id;
    item.data.city.name = city.name;
    item.data.city.coord.lat = city.latitude;
    item.data.city.coord.lon = city.longitude;
    return item;
  }
}
