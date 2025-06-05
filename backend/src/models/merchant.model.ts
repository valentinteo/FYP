import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Charity from './charity.model';

@Table({ tableName: 'merchant', timestamps: false })
export default class Merchant extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    merchant_id!: number;

    @Column({ type: DataType.STRING })
    merchant_name!: string;

    @Column({ type: DataType.STRING })
    merchant_email!: string;

    @Column({ type: DataType.STRING })
    merchant_phone!: string;

    @Column({ type: DataType.STRING })
    merchant_location!: string;

    @ForeignKey(() => Charity)
    @Column({ type: DataType.INTEGER })
    merchant_charity_id!: number;

    @BelongsTo(() => Charity)
    charity!: Charity;
}
