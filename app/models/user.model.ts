import { Model, DataTypes } from "sequelize";
import sequelize from "../models";

export interface IUserAttributes {
  id?: number;
  email: string;
  password: string;
  name: string;
}

export class User extends Model<IUserAttributes>
  implements IUserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
};
User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
    timestamps: false,
    sequelize,
    modelName: "user",
})

export default User;