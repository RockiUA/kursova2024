import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@auth/decorators';
import { JwtPayload } from '@auth/interfaces';
import { GetCityInput } from '@city/dto';
import { WeatherApiCurrent, WeatherApiForecast } from '@weather-api/interfaces';
import { CurrentWeatherOutput, ForecastOutput, FetchForecastInput } from './dto';
import { WeatherService } from './services';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => [ForecastOutput], { nullable: true })
  public fetchForecastByUser(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('options', { nullable: true }) options: FetchForecastInput,
  ): Promise<WeatherApiForecast[]> {
    const { sub } = jwtPayload;
    return this.weatherService.fetchForecastByUser(sub, options);
  }

  @Query(() => [ForecastOutput], { nullable: true })
  public fetchForecastByCity(
    @Args('filter') filter: GetCityInput,
    @Args('options', { nullable: true }) options: FetchForecastInput,
  ): Promise<WeatherApiForecast[]> {
    return this.weatherService.fetchForecastByCity(filter, options);
  }

  @Query(() => [CurrentWeatherOutput], { nullable: true })
  public fetchCurrentWeatherByUser(@CurrentUser() jwtPayload: JwtPayload): Promise<WeatherApiCurrent[]> {
    const { sub } = jwtPayload;
    return this.weatherService.fetchCurrentWeatherByUser(sub);
  }

  @Query(() => [CurrentWeatherOutput], { nullable: true })
  public fetchCurrentWeatherByCity(@Args('filter') filter: GetCityInput): Promise<WeatherApiCurrent[]> {
    return this.weatherService.fetchCurrentWeatherByCity(filter);
  }
}
