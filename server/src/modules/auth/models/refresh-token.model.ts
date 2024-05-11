import { BelongsTo, Column, DataType, ForeignKey, Min, Model, NotEmpty, Table } from 'sequelize-typescript';
import { User } from '@user/models/user.model';

interface RefreshTokenAttributes {
  token: string;
  userId: number;
}

@Table({ tableName: 'refresh_tokens', timestamps: true })
export class RefreshToken extends Model<RefreshToken, RefreshTokenAttributes> {
  @Min(1)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @NotEmpty
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  token: string;

  @Min(1)
  @NotEmpty
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
