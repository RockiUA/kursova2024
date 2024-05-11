import { Field, ObjectType } from '@nestjs/graphql';
import { CityForecastOutput } from './city-forecast.output';
import { WeatherOutput } from './weather.output';

@ObjectType('Forecast')
export class ForecastOutput {
  createdAt: Date;

  @Field(() => [WeatherOutput], {
    nullable: 'items',
    description: 'Forecasts.',
  })
  forecasts: WeatherOutput[];

  @Field(() => CityForecastOutput, { description: 'Forecasts of this city.' })
  city: CityForecastOutput;
}
