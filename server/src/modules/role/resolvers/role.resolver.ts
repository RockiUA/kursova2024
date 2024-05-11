import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetParametersPipe, GetParametersOutput } from '@common';
import { RoleRequired } from '../decorators';
import { CreateRoleInput, GetRoleParametersInput, GetRoleInput, UpdateRoleInput } from '../dto';
import { Role, RoleOutput } from '../models';
import { Roles } from '../roles.enum';
import { RoleService } from '../services';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleOutput)
  @RoleRequired(Roles.ADMIN)
  public createRole(@Args('role') role: CreateRoleInput): Promise<Role> {
    return this.roleService.create(role);
  }

  @Query(() => RoleOutput, { nullable: true })
  @RoleRequired(Roles.ADMIN)
  public role(@Args('filter') filter: GetRoleInput) {
    return this.roleService.findOne(filter);
  }

  @Query(() => [RoleOutput], { nullable: true })
  @RoleRequired(Roles.ADMIN)
  public roles(
    @Args('filter', { nullable: true }) where: GetRoleInput,
    @Args('parameters', { nullable: true, type: () => GetRoleParametersInput }, new GetParametersPipe())
    parameters: GetParametersOutput,
  ): Promise<Role[]> {
    return this.roleService.findAll(where, parameters);
  }

  @Mutation(() => [RoleOutput])
  @RoleRequired(Roles.ADMIN)
  public updateRole(@Args('filter') filter: GetRoleInput, @Args('payload') payload: UpdateRoleInput): Promise<Role[]> {
    return this.roleService.update(filter, payload);
  }

  @Mutation(() => Int, { nullable: true })
  @RoleRequired(Roles.ADMIN)
  public deleteRole(@Args('filter') filter: GetRoleInput): Promise<number> {
    return this.roleService.delete(filter);
  }
}
