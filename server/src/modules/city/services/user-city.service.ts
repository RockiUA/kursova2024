import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { createGetParameters } from '@common';
import { Op, WhereOptions } from 'sequelize';
import { User } from '@user/models/user.model';
import { UserService } from '@user/user.service';
import { GetCityInput } from '../dto';
import { City, UserCity } from '../models';

@Injectable()
export class UserCityService {
  constructor(
    @InjectModel(UserCity)
    private readonly userCityRepository: typeof UserCity,
    @InjectModel(City)
    private readonly cityRepository: typeof City,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async create(userId: number, citiesFilter: GetCityInput[]): Promise<UserCity[]> {
    const maximumAllowedCities = this.configService.get<string>('maximumCitiesAllowed');
    const parameters = createGetParameters();
    const cities = await this.cityRepository.findAll({
      where: { [Op.or]: [...(citiesFilter as WhereOptions<City>[])] },
      ...parameters,
    });

    const user = await this.userService.findOne({ id: userId });
    const citiesIds = cities.map((item) => item.id);

    if (user.cities.length + cities.length > Number(maximumAllowedCities)) {
      throw new BadRequestException(`Maximum cities amount: ${maximumAllowedCities}!`);
    }

    if (cities.length) {
      const records = citiesIds.map((item) => ({ userId, cityId: item }));
      return this.userCityRepository.bulkCreate(records, { updateOnDuplicate: ['userId', 'cityId'] });
    }

    throw new BadRequestException('Are provided cities valid?');
  }

  public async update(userId: number, cityFilter: GetCityInput, cityPayload: GetCityInput): Promise<UserCity[]> {
    const parameters = createGetParameters();
    const cities = await this.cityRepository.findAll({
      where: { [Op.or]: [{ ...cityFilter }, { ...cityPayload }] },
      ...parameters,
    });

    if (cities.length > 1) {
      const oldCity = cities.find((item) => this.isCityCorresponding(item, cityFilter));
      const newCity = cities.find((item) => this.isCityCorresponding(item, cityPayload));

      const [_count, userCities] = await this.userCityRepository.update(
        { cityId: newCity.id },
        { where: { cityId: oldCity.id, userId }, returning: true },
      );

      return userCities;
    }

    throw new BadRequestException('Are provided cities valid?');
  }

  public async delete(userId: number, citiesFilter: GetCityInput[]): Promise<number> {
    const parameters = createGetParameters();
    const cities = await this.cityRepository.findAll({
      where: { [Op.or]: [...(citiesFilter as WhereOptions<City>[])] },
      ...parameters,
      include: [{ model: User, where: { id: userId } }],
    });

    const citiesIds = cities?.map((item) => item.id) ?? [];

    if (citiesIds.length) {
      return this.userCityRepository.destroy({ where: { userId, cityId: citiesIds } });
    }

    throw new BadRequestException('Current user does not have such cities!');
  }

  private isCityCorresponding(item: City, cityFilter: GetCityInput): boolean {
    const { id, name, latitude, longitude } = cityFilter;
    return item.id === id || item.name === name || item.latitude === latitude || item.longitude === longitude;
  }
}
