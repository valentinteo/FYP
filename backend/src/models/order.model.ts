import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';
import Charity from './charity.model';
import Merchant from './merchant.model';

@Table({ tableName: 'order', timestamps: false })
export default class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    order_id!: number;

    @Column({ type: DataType.STRING, allowNull: false,})
    order_number!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    order_user_id!: number;

    @ForeignKey(() => Charity)
    @Column({ type: DataType.INTEGER })
    order_charity_id!: number;

    @ForeignKey(() => Merchant)
    @Column({ type: DataType.INTEGER })
    order_merchant_id!: number;

    @Column({ type: DataType.DECIMAL })
    order_subtotal!: number;

    @Column({ type: DataType.DECIMAL })
    order_points_deducted!: number;

    @Column({ type: DataType.INTEGER })
    order_points_earned!: number;

    @Column({ type: DataType.DECIMAL })
    order_round_up_donation!: number;

    @Column({ type: DataType.DECIMAL })
    order_merchant_discount!: number;

    @Column({ type: DataType.DECIMAL })
    order_merchant_discount_donated!: number;

    @Column({ type: DataType.DATE })
    order_datetime!: Date;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Charity)
    charity!: Charity;

    @BelongsTo(() => Merchant)
    merchant!: Merchant;
}
