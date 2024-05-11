import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetParametersOutput, createGetParameters } from '@common';
import { Op } from 'sequelize';
import { User } from '@user/models/user.model';
import { CreateCityInput, GetCityInput, UpdateCityInput } from '../dto';
import { City } from '../models';

@Injectable()
export class CityService {
  constructor(@InjectModel(City) private readonly cityRepository: typeof City) {}

  public findAll(filter: GetCityInput, parameters: GetParametersOutput): Promise<City[]> {
    return this.cityRepository.findAll({
      where: {
        ...filter,
        name: {
          [Op.iLike]: `${filter.name ?? '%'}%`,
        },
      },
      ...parameters,
    });
  }

  public async findOne(filter: GetCityInput): Promise<City> {
    const response = await this.cityRepository.findOne({
      where: { ...filter },
    });
    return response?.dataValues;
  }

  public findUserCities(userId: number): Promise<City[]> {
    const parameters = createGetParameters();
    return this.cityRepository.findAll({
      include: [{ model: User, where: { id: userId } }],
      ...parameters,
    });
  }

  public async create(payload: CreateCityInput): Promise<City> {
    const candidate = await this.cityRepository.findOne({
      where: { ...payload },
    });

    if (candidate) {
      throw new BadRequestException('Such city already exists!');
    }

    const city = await this.cityRepository.create(payload);
    return city?.dataValues;
  }

  public async update(filter: GetCityInput, payload: UpdateCityInput): Promise<City[]> {
    const [_count, cities] = await this.cityRepository.update(payload, {
      where: { ...filter },
      returning: true,
    });

    return cities;
  }

  public delete(filter: GetCityInput): Promise<number> {
    return this.cityRepository.destroy({ where: { ...filter } });
  }
}
