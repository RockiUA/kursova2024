import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetParametersOutput, createGetParameters } from '@common';
import { User } from '@user/models/user.model';
import { CreateRoleInput, GetRoleInput, UpdateRoleInput } from '../dto';
import { Role } from '../models';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

  public async create(input: CreateRoleInput): Promise<Role> {
    const [role] = await this.roleRepository.upsert(input);
    return role.dataValues;
  }

  public async findOne(filter: GetRoleInput): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { ...filter } });
    return role.dataValues;
  }

  public findAll(filter: GetRoleInput, parameters: GetParametersOutput): Promise<Role[]> {
    return this.roleRepository.findAll({ where: { ...filter }, ...parameters });
  }

  public async findUserRoles(userId: number): Promise<Role[]> {
    const parameters = createGetParameters();
    const roles = await this.roleRepository.findAll({
      include: [{ model: User, where: { id: userId } }],
      ...parameters,
    });

    return roles;
  }

  public async update(filter: GetRoleInput, payload: UpdateRoleInput): Promise<Role[]> {
    const [_count, roles] = await this.roleRepository.update(payload, { where: { ...filter }, returning: true });
    return roles;
  }

  public delete(filter: GetRoleInput): Promise<number> {
    return this.roleRepository.destroy({ where: { ...filter } });
  }
}
