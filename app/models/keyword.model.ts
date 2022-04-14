import { DataTypes, Model } from 'sequelize'
import sequelize from './index' // 여차하면 지워야함  여기부터 저 아래까지

export interface IKeywordAttributes {
  id?: number;
  name: string;
};

export class Keyword extends Model<IKeywordAttributes>
  implements IKeywordAttributes {
  public id!: number;
  public name!: string;
}

Keyword.init(
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
    modelName: 'keyword',
    sequelize,
    timestamps: false,
  }
)

export default Keyword;