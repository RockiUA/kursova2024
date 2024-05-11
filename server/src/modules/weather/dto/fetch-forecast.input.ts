import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { serverConfig } from '@/config/server.config';

@InputType()
export class FetchForecastInput {
  @Field(() => Int, {
    description: 'Number of days for which the weather forecast should be obtained.',
    nullable: true,
    defaultValue: serverConfig.weatherAPI.forecastDays,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(serverConfig.weatherAPI.forecastDaysMaximum)
  readonly days: number = serverConfig.weatherAPI.forecastDays;
}
