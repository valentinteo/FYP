import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Charity from './charity.model';

@Table({ tableName: 'user', timestamps: false })
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    user_id!: number;

    @Column({ type: DataType.STRING })
    user_name!: string;

    @Column({ type: DataType.STRING })
    user_email!: string;

    @Column({ type: DataType.STRING })
    user_phone!: string;

    @Column({ type: DataType.STRING })
    user_password!: string;

    @Column({ type: DataType.STRING })
    user_role!: string;

    @Column({ type: DataType.INTEGER })
    user_points!: number;

    @Column({ type: DataType.INTEGER })
    user_redeemed_points!: number;

    @Column({ type: DataType.INTEGER })
    user_balance_points!: number;

    @Column({ type: DataType.STRING })
    user_donation_mode!: string;

    @Column({ type: DataType.DECIMAL })
    user_fixed_donation_amount!: number;

    @ForeignKey(() => Charity)
    @Column({ type: DataType.INTEGER })
    user_preferred_charity_id!: number;

    @BelongsTo(() => Charity)
    preferredCharity!: Charity;
}
