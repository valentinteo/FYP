// // import {
// //   Table,
// //   Column,
// //   Model,
// //   PrimaryKey,
// //   AutoIncrement,
// //   DataType,
// //   CreatedAt
// // } from 'sequelize-typescript';

// // @Table({ tableName: 'admin', timestamps: false })
// // export default class Admin extends Model {
// //   @PrimaryKey
// //   @AutoIncrement
// //   @Column({ type: DataType.INTEGER })
// //   admin_user_id!: number;

// //   @Column({ type: DataType.STRING })
// //   admin_name!: string;

// //   @Column({ type: DataType.STRING })
// //   admin_email!: string;

// //   @Column({ type: DataType.STRING })
// //   admin_phone!: string;

// //   @Column({ type: DataType.STRING })
// //   admin_password!: string;

// //   @Column({ type: DataType.STRING })
// //   admin_role!: string;

// //   @CreatedAt
// //   @Column({ type: DataType.DATE, field: 'admin_created_date_time' })
// //   admin_created_date_time!: Date;
// // }

// import {
//   Table,
//   Column,
//   Model,
//   PrimaryKey,
//   AutoIncrement,
//   DataType,
//   CreatedAt
// } from 'sequelize-typescript';

// @Table({ tableName: 'admin', timestamps: false })
// export default class Admin extends Model {
//   @PrimaryKey
//   @AutoIncrement
//   @Column({ type: DataType.INTEGER })
//   admin_user_id!: number;

//   @Column({ type: DataType.STRING })
//   admin_name!: string;

//   @Column({ type: DataType.STRING })
//   admin_email!: string;

//   @Column({ type: DataType.STRING })
//   admin_phone!: string;

//   @Column({ type: DataType.STRING })
//   admin_password!: string;

//   @Column({ type: DataType.STRING })
//   admin_role!: string;

//   @CreatedAt
//   @Column({ type: DataType.DATE, field: 'admin_created_date_time' })
//   admin_created_date_time!: Date;

//   // // ✅ NEW COLUMN for approval status
//   // @Column({ type: DataType.BOOLEAN, defaultValue: false })
//   // is_approved!: boolean;
// }

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'admin', timestamps: false })
export default class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  admin_user_id!: number;

  @Column({ type: DataType.STRING })
  admin_name!: string;

  @Column({ type: DataType.STRING })
  admin_email!: string;

  @Column({ type: DataType.STRING })
  admin_phone!: string;

  @Column({ type: DataType.STRING })
  admin_password!: string;

  @Column({ type: DataType.STRING })
  admin_role!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'admin_created_date_time' })
  admin_created_date_time!: Date;

  // ✅ ACTIVATE THIS FIELD
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_approved!: boolean;
}
