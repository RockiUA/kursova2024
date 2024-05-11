import { Field, ObjectType } from '@nestjs/graphql';
import { CityForecastOutput } from './city-forecast.output';
import { WeatherOutput } from './weather.output';

@ObjectType('CurrentWeather')
export class CurrentWeatherOutput {
  createdAt: Date;

  @Field(() => WeatherOutput, { description: 'Current weather.' })
  weather: WeatherOutput;

  @Field(() => CityForecastOutput, { description: 'Weather data of this city.' })
  city: CityForecastOutput;
}
