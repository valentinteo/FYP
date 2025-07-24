import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey
} from 'sequelize-typescript';
import User from './user.model';
import Charity from './charity.model';

@Table({ tableName: 'webCart', timestamps: false })
export default class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  cartId!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  cartDonationQuantity!: number;

  @ForeignKey(() => Charity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cartCharityId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cartUserId!: number;
}
