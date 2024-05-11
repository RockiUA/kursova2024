import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Weather')
export class WeatherOutput {
  @Field({ description: 'Forecast date.' })
  date: string;

  @Field(() => Float, { description: 'Forecast temperature.' })
  temperature: number;

  @Field(() => Float, { description: 'Temperature feels like.' })
  temperatureFeelsLike: number;

  @Field({ description: 'Weather condition.' })
  weather: string;

  @Field({ description: 'Weather description.' })
  weatherDescription: string;

  @Field({ description: 'Weather icon' })
  weatherIcon: string;

  @Field(() => Float, { description: 'Speed of wind.' })
  windSpeed: number;

  @Field(() => Int, { description: 'Humidity.' })
  humidity: number;

  @Field(() => Int, { description: 'Pressure.' })
  pressure: number;
}
