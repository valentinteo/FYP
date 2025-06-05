import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Charity from './charity.model';

@Table({ tableName: 'fundraising', timestamps: false })
export default class Fundraising extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    fundraising_id!: number;

    @ForeignKey(() => Charity)
    @Column({ type: DataType.INTEGER })
    fundraising_charity_id!: number;

    @BelongsTo(() => Charity)
    charity!: Charity;

    @Column({ type: DataType.STRING })
    fundraising_title!: string;

    @Column({ type: DataType.TEXT })
    fundraising_description!: string;

    @Column({ type: DataType.DECIMAL })
    fundraising_goal_amount!: number;

    @Column({ type: DataType.DATE })
    fundraising_start_datetime!: Date;

    @Column({ type: DataType.DATE })
    fundraising_end_datetime!: Date;
}
