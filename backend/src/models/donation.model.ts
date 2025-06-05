import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';
import Charity from './charity.model';
import Order from './order.model';

@Table({ tableName: 'donation', timestamps: false })
export default class Donation extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    donation_id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    donation_user_id!: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    donation_order_id!: number;

    @ForeignKey(() => Charity)
    @Column({ type: DataType.INTEGER })
    donation_charity_id!: number;

    @Column({ type: DataType.DECIMAL })
    donation_amount!: number;

    @Column({ type: DataType.STRING })
    donation_mode!: string;

    @Column({ type: DataType.DATE })
    donation_created_datetime!: Date;

    @Column({ type: DataType.BOOLEAN })
    donation_is_tax_deductible!: boolean;

    @Column({ type: DataType.DECIMAL })
    donation_tax_deductible_amount!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Order)
    order!: Order;

    @BelongsTo(() => Charity)
    charity!: Charity;
}