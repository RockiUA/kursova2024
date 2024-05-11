import { Args, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { GetParametersOutput, GetParametersPipe } from '@common';
import { GetCityInput, GetCityParametersInput } from '../dto';
import { City, CityOutput } from '../models';
import { CityService } from '../services/city.service';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => CityOutput, { nullable: true })
  public city(@Args('filter') filter: GetCityInput): Promise<City> {
    return this.cityService.findOne(filter);
  }

  @Query(() => [CityOutput], { nullable: true })
  public cities(
    @Args('filter', { nullable: true }) filter: GetCityInput,
    @Args('parameters', { nullable: true, type: () => GetCityParametersInput }, new GetParametersPipe())
    parameters: GetParametersOutput,
  ): Promise<City[]> {
    return this.cityService.findAll(filter, parameters);
  }
}
