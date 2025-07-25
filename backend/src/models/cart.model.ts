import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Charity from './charity.model';
import User from './user.model';

@Table({ tableName: 'webCart', timestamps: false })
export default class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  cartId!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  cartDonationQuantity!: number;

  @ForeignKey(() => Charity)
  @Column({ type: DataType.INTEGER })
  cartCharityId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  cartUserId!: number;

  @BelongsTo(() => Charity)
  charity!: Charity;

  @BelongsTo(() => User)
  user!: User;
}

