import { Injectable, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from '@user/user.service';
import { GetRoleInput } from '../dto';
import { Role, UserRole } from '../models';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole)
    private readonly userRoleRepository: typeof UserRole,
    @InjectModel(Role)
    private readonly roleRepository: typeof Role,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async create(userId: number, roleFilter: GetRoleInput): Promise<UserRole> {
    const user = await this.userService.findOne({ id: userId });
    const role = await this.roleRepository.findOne({ where: { ...roleFilter } });

    if (user && role) {
      const [userRole] = await this.userRoleRepository.upsert({ userId, roleId: role.id }, { conflictFields: ['id'] });
      return userRole;
    }

    throw new BadRequestException('There is no such user or role!');
  }

  public async update(userId: number, currentRoleId: number, newRoleId: number): Promise<UserRole[]> {
    const user = await this.userService.findOne({ id: userId });
    const newRole = await this.roleRepository.findOne({ where: { id: newRoleId } });

    if (user && newRole) {
      const [_count, userRoles] = await this.userRoleRepository.update(
        { roleId: newRoleId },
        { where: { roleId: currentRoleId, userId }, returning: true },
      );

      return userRoles;
    }

    throw new BadRequestException('There is no such user or role!');
  }

  public delete(userId: number, roleId: number): Promise<number> {
    return this.userRoleRepository.destroy({ where: { userId, roleId } });
  }
}
