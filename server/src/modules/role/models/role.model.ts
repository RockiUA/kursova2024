import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table, BelongsToMany, Min, IsAlphanumeric } from 'sequelize-typescript';
import { User } from '@user/models/user.model';
import { UserRole } from './user-role.model';

interface RoleAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model<Role, RoleAttributes> {
  @Min(1)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @IsAlphanumeric
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @IsAlphanumeric
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

@ObjectType('Role')
export class RoleOutput {
  @Field(() => ID, { description: 'Role ID' })
  id: number;

  @Field({ description: 'Role name', nullable: true })
  name: string;

  @Field({ description: 'Role description', nullable: true })
  description: string;
}
