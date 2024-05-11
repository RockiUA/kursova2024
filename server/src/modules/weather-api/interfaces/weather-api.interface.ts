import { City } from '@city/models';
import { WeatherApiCurrent, WeatherApiForecast } from './weather-api-response.interface';

export interface WeatherApi {
  fetchForecast(cities: City[]): Promise<WeatherApiForecast[]>;
  fetchCurrent(cities: City[]): Promise<WeatherApiCurrent[]>;
}
