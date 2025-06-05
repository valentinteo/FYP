import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Order from './order.model';

@Table({ tableName: 'order_item', timestamps: false })
export default class OrderItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    order_item_id!: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    order_item_order_id!: number;

    @Column({ type: DataType.STRING })
    order_item_name!: string;

    @Column({ type: DataType.TEXT })
    order_item_description!: string;

    @Column({ type: DataType.DECIMAL })
    order_item_price!: number;

    @Column({ type: DataType.INTEGER })
    order_item_quantity!: number;

    @BelongsTo(() => Order)
    order!: Order;
}