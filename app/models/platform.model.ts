import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from './index' // 여차하면 지워야함  여기부터 저 아래까지

export interface IPlatformAttributes {
  id?: number;
  name: string;
}

export interface PlatformCreateAttributes extends Optional<IPlatformAttributes, "id"> {}

export class Platform extends Model<PlatformCreateAttributes ,IPlatformAttributes>
  implements IPlatformAttributes {
  public id!: number;
  public name!: string;
  
  public static associations: {
  };
}

Platform.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    }
  },
  {
    modelName: 'Platform',
    tableName: 'platforms',
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);