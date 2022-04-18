import { Model, DataTypes } from "sequelize"
import sequelize from "../models";

enum Gender {
  M = "M",
  F = "F",
  Etc = "Etc",
}

export interface IApplicantAttributes {
  id?: number;
  name: string;
  gender: Gender;
  height: number;
  weight: number;
  thumbnail_url: string;
  birthdate: Date;
  contact: string;
  address: string;
}

export class Applicant extends Model<IApplicantAttributes>
  implements IApplicantAttributes {
  [x: string]: any;
  public id!: number;
  public name!: string;
  public gender!: Gender;
  public height!: number;
  public weight!: number;
  public thumbnail_url: any;
  public birthdate!: Date;
  public contact!: string;
  public address!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Applicant.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM(Gender.M, Gender.F, Gender.Etc),
    },
    height: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    weight: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    thumbnail_url: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    contact: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
  },
  {
    modelName: "applicant",
    sequelize
  }
)

export default Applicant;