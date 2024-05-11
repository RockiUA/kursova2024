import { Injectable, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { City } from '@city/models';
import { CityService } from '@city/services';
import { Logger } from '@logger/services';
import { Role } from '@role/models';
import { Roles } from '@role/roles.enum';
import { RoleService, UserRoleService } from '@role/services';
import { UpdateUserInput, CreateUserInput, GetUserInput, UpdatePasswordInput } from './dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @Inject(forwardRef(() => UserRoleService))
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
    private readonly cityService: CityService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async create(payload: CreateUserInput): Promise<User> {
    const salt = this.configService.get<number>('jwtTokens.hashingSalt');
    const candidate = await this.findOne({
      email: payload.email,
    });

    if (candidate) {
      throw new BadRequestException(`Wrong credentials!`);
    }

    this.logger.debug(`Hashing password...`);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const user = await this.userRepository.create({ email: payload.email, password: hashedPassword });
    await this.userRoleService.create(user.id, { name: Roles.USER });
    return user?.dataValues;
  }

  public async findOne(filter: GetUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...filter },
      include: [Role, City],
    });
    return user?.dataValues;
  }

  public findUserCities(id: number): Promise<City[]> {
    return this.cityService.findUserCities(id);
  }

  public findUserRoles(id: number): Promise<Role[]> {
    return this.roleService.findUserRoles(id);
  }

  public async updateUser(filter: GetUserInput, payload: UpdateUserInput): Promise<User[]> {
    const [_count, users] = await this.userRepository.update({ ...payload }, { where: { ...filter }, returning: true });
    return users;
  }

  public async updatePassword(filter: GetUserInput, payload: UpdatePasswordInput): Promise<User[]> {
    const salt = this.configService.get<number>('jwtTokens.hashingSalt');
    const user = await this.userRepository.findOne({ where: { ...filter } });
    const isPasswordValid = await bcrypt.compare(payload.oldPassword, user.password);

    if (isPasswordValid) {
      this.logger.debug(`Hashing new password...`);
      const newHashedPassword = await bcrypt.hash(payload.newPassword, salt);
      const [_count, users] = await this.userRepository.update(
        { password: newHashedPassword },
        { where: { ...filter }, returning: true },
      );
      return users;
    }

    throw new BadRequestException('Wrong credentials!');
  }

  public delete(filter: GetUserInput): Promise<number> {
    return this.userRepository.destroy({ where: { ...filter } });
  }
}
