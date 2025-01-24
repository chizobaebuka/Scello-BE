import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
  },
  {
    sequelize, // Pass your Sequelize instance
    tableName: 'users',
    timestamps: true,
  }
);

export default User;