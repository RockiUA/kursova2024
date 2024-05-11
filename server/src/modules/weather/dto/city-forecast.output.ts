import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CityCoordinates')
export class CityCoordinatesOutput {
  @Field(() => Float, { description: 'City latitude' })
  latitude: number;

  @Field(() => Float, { description: 'City longitude' })
  longitude: number;
}

@ObjectType('CityForecast')
export class CityForecastOutput {
  @Field(() => ID, { description: 'City ID.' })
  id: number;

  @Field({ description: 'Name of city.' })
  cityName: string;

  @Field({ description: 'Coordinates of city.' })
  cityCoordinates: CityCoordinatesOutput;
}
