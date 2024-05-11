import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  IsEmail,
  Length,
  Min,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript';
import { RefreshToken } from '@auth/models/refresh-token.model';
import { City, CityOutput, UserCity } from '@city/models';
import { Role, RoleOutput, UserRole } from '@role/models';

interface UserAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User, UserAttributes> {
  @Min(1)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @NotEmpty
  @IsEmail
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @NotEmpty
  @Length({ min: 8, max: 64 })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasOne(() => RefreshToken)
  refreshToken: RefreshToken;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => City, () => UserCity)
  cities: City[];
}

@ObjectType('User')
export class UserOutput {
  @Field(() => ID, { description: 'User ID' })
  id: number;

  @Field({ description: 'User Email' })
  email: string;

  password: string;

  @Field(() => [RoleOutput], { description: 'User Roles', nullable: 'items' })
  roles: RoleOutput[];

  @Field(() => [CityOutput], {
    description: 'User pinned cities',
    nullable: 'items',
  })
  cities: CityOutput[];
}
