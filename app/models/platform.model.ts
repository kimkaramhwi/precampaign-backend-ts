import { DataTypes, Model } from 'sequelize'
import sequelize from './index' // 여차하면 지워야함  여기부터 저 아래까지

export interface IPlatformAttributes {
  id?: number;
  name: string;
}

export class Platform extends Model<IPlatformAttributes>
  implements IPlatformAttributes {
  public id!: number;
  public name!: string;
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
    modelName: 'platform',
    sequelize,
    timestamps: false,
  }
)

export default Platform;