import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { RoleRequired } from '../decorators';
import { UserRole, UserRoleOutput } from '../models';
import { Roles } from '../roles.enum';
import { UserRoleService } from '../services';

@Resolver()
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Mutation(() => UserRoleOutput)
  @RoleRequired(Roles.ADMIN)
  public addUserRole(
    @Args('user', { type: () => Int }) userId: number,
    @Args('role', { type: () => Int }) roleId: number,
  ): Promise<UserRole> {
    return this.userRoleService.create(userId, { id: roleId });
  }

  @Mutation(() => [UserRoleOutput], { nullable: true })
  @RoleRequired(Roles.ADMIN)
  public updateUserRole(
    @Args('user', { type: () => Int }) userId: number,
    @Args('current_role', { type: () => Int }) currentRoleId: number,
    @Args('new_role', { type: () => Int }) newRoleId: number,
  ): Promise<UserRole[]> {
    return this.userRoleService.update(userId, currentRoleId, newRoleId);
  }

  @Mutation(() => [UserRoleOutput], { nullable: true })
  @RoleRequired(Roles.ADMIN)
  public deleteUserRole(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('role', { type: () => Int }) roleId: number,
  ): Promise<number> {
    return this.userRoleService.delete(userId, roleId);
  }
}
