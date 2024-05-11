import { Field, InputType } from '@nestjs/graphql';
import { GetParametersInput, generateSortByRegex } from '@common';
import { IsOptional, IsString, Matches } from 'class-validator';
import { sortByConfig } from '@config/sortBy.config';
import { CityOutput } from '../models';

@InputType()
export class GetCityParametersInput extends GetParametersInput {
  @Field(() => String, {
    description: 'Sort by',
    nullable: true,
    defaultValue: 'id',
  })
  @IsOptional()
  @IsString()
  @Matches(generateSortByRegex(sortByConfig.city), {
    message: 'Incorrect sort by parameter!',
  })
  readonly sortBy: keyof CityOutput = 'id';
}
