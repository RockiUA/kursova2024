import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { CreateCityInput } from './create-city.input';

@InputType()
export class GetCityInput extends PartialType(CreateCityInput) {
  @Field(() => ID, { description: 'City ID', nullable: true })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  readonly id?: number;
}
