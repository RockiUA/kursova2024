import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@auth/decorators';
import { JwtPayload } from '@auth/interfaces';
import { GetCityInput } from '../dto';
import { UserCity, UserCityOutput } from '../models';
import { UserCityService } from '../services';

@Resolver()
export class UserCityResolver {
  constructor(private readonly userCityService: UserCityService) {}

  @Mutation(() => [UserCityOutput])
  public addUserCities(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('payload', { type: () => [GetCityInput] }) cities: GetCityInput[],
  ): Promise<UserCity[]> {
    const { sub } = jwtPayload;
    return this.userCityService.create(sub, cities);
  }

  @Mutation(() => [UserCityOutput], { nullable: true })
  public updateUserCity(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('filter') cityFilter: GetCityInput,
    @Args('payload') cityPayload: GetCityInput,
  ): Promise<UserCity[]> {
    const { sub } = jwtPayload;
    return this.userCityService.update(sub, cityFilter, cityPayload);
  }

  @Mutation(() => Int)
  public deleteUserCities(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('payload', { type: () => [GetCityInput] }) cities: GetCityInput[],
  ): Promise<number> {
    const { sub } = jwtPayload;
    return this.userCityService.delete(sub, cities);
  }
}
