import { Model, DataTypes, Optional } from "sequelize"
import sequelize from "../models";

enum Gender {
  Male = "Male",
  Female = "Female",
  DoNotSelect = "DoNotSelect",
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

// export interface ApplicantCreationAttributes extends Optional<IApplicantAttributes, "id"> {}
export class Applicant extends Model<IApplicantAttributes>
  implements IApplicantAttributes {
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

//   public static associations: {
//   };
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
      type: DataTypes.ENUM(Gender.Male, Gender.Female, Gender.DoNotSelect),
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
    modelName: "Applicant",
    tableName: "applicants",
    sequelize
  }
);