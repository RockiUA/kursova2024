import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, Min, Model, NotEmpty, Table } from 'sequelize-typescript';
import { User } from '@user/models/user.model';
import { City } from './city.model';

@Table({ tableName: 'user_cities', timestamps: true })
export class UserCity extends Model<UserCity> {
  @Min(1)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Min(1)
  @NotEmpty
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Min(1)
  @NotEmpty
  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER })
  cityId: number;
}

@ObjectType('UserCity')
export class UserCityOutput {
  @Field(() => ID, { description: 'User-city relation ID' })
  id: number;

  @Field(() => ID, { description: 'User ID' })
  userId: number;

  @Field(() => ID, { description: 'City ID' })
  cityId: number;
}
