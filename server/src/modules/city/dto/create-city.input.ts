import { Field, Float, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateCityInput {
  @Field({ description: 'City name' })
  @IsString()
  readonly name: string;

  @Field(() => Float, { description: 'City longitude' })
  @Type(() => Number)
  @Max(180)
  @Min(-180)
  readonly longitude: number;

  @Field(() => Float, { description: 'City latitude' })
  @Type(() => Number)
  @Max(90)
  @Min(-90)
  readonly latitude: number;
}
