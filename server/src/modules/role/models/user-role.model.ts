import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, Min, Model, NotEmpty, Table } from 'sequelize-typescript';
import { User } from '@user/models/user.model';
import { Role } from './role.model';

@Table({ tableName: 'user_roles', timestamps: true })
export class UserRole extends Model<UserRole> {
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
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @Min(1)
  @NotEmpty
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}

@ObjectType('UserRole')
export class UserRoleOutput {
  @Field(() => ID, { description: 'User-role relation ID' })
  id: number;

  @Field(() => ID, { description: 'User ID' })
  userId: number;

  @Field(() => ID, { description: 'Role ID' })
  roleId: number;
}
