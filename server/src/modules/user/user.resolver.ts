import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@auth/decorators';
import { JwtPayload } from '@auth/interfaces';
import { CityOutput } from '@city/models';
import { IgnoreStandardLoggingInterceptor } from '@logger/decorators';
import { AuthLoggingInterceptor } from '@logger/interceptors';
import { RoleOutput } from '@role/models';
import { UpdatePasswordInput, UpdateUserInput } from './dto';
import { UserOutput } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => UserOutput, { nullable: true })
  public me(@CurrentUser() jwtPayload: JwtPayload): Promise<UserOutput> {
    const { sub } = jwtPayload;
    return this.usersService.findOne({ id: sub });
  }

  @Mutation(() => [UserOutput], { nullable: true })
  public updateUser(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('payload') payload: UpdateUserInput,
  ): Promise<UserOutput[]> {
    const { sub } = jwtPayload;
    return this.usersService.updateUser({ id: sub }, payload);
  }

  @Mutation(() => [UserOutput])
  @IgnoreStandardLoggingInterceptor()
  @UseInterceptors(new AuthLoggingInterceptor())
  public updatePassword(
    @CurrentUser() jwtPayload: JwtPayload,
    @Args('payload') passwords: UpdatePasswordInput,
  ): Promise<UserOutput[]> {
    const { sub } = jwtPayload;
    return this.usersService.updatePassword({ id: sub }, passwords);
  }

  @ResolveField('roles')
  public roles(@Parent() user: UserOutput): Promise<RoleOutput[]> {
    return this.usersService.findUserRoles(user.id);
  }

  @ResolveField('cities')
  public cities(@Parent() user: UserOutput): Promise<CityOutput[]> {
    return this.usersService.findUserCities(user.id);
  }
}
