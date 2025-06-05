import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Order from './order.model';
import User from './user.model';

@Table({ tableName: 'issue', timestamps: false })
export default class Issue extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    issue_id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    issue_user_id!: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    issue_order_id!: number;

    @Column({ type: DataType.STRING })
    issue_title!: string;

    @Column({ type: DataType.TEXT })
    issue_description!: string;

    @Column({ type: DataType.STRING })
    issue_status!: string;

    @Column({ type: DataType.DATE })
    issue_created_datetime!: Date;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Order)
    order!: Order;
}