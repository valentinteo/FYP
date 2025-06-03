import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'charity', timestamps: false })
export default class Charity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  charity_id!: number;

  @Column({ type: DataType.STRING })
  charity_name!: string;

  @Column({ type: DataType.TEXT })
  charity_description!: string;

  @Column({ type: DataType.BOOLEAN })
  is_charity_featured!: boolean;

  @Column({ type: DataType.STRING })
  charity_UEN!: string;

  @Column({ type: DataType.STRING })
  charity_image!: string;
}

