import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table, BelongsToMany, Max, Min, NotEmpty } from 'sequelize-typescript';
import { User } from '@user/models/user.model';
import { UserCity } from './user-city.model';

interface CityAttributes {
  name: string;
  longitude: number;
  latitude: number;
}

@Table({ tableName: 'cities', timestamps: true })
export class City extends Model<City, CityAttributes> {
  @Min(1)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @NotEmpty
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @NotEmpty
  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @Max(180)
  @Min(-180)
  @Column({ type: DataType.FLOAT, allowNull: false })
  longitude: number;

  @Max(90)
  @Min(-90)
  @Column({ type: DataType.FLOAT, allowNull: false })
  latitude: number;

  @BelongsToMany(() => User, () => UserCity)
  users: User[];
}

@ObjectType('City')
export class CityOutput {
  @Field(() => ID, { description: 'City ID' })
  id: number;

  @Field({ description: 'City name' })
  name: string;

  @Field({ description: 'Country name.' })
  country: string;

  @Field(() => Float, { description: 'City longitude' })
  longitude: number;

  @Field(() => Float, { description: 'City latitude' })
  latitude: number;
}
