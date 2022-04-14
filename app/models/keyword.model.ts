import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from './index' // 여차하면 지워야함  여기부터 저 아래까지

export interface IKeywordAttributes {
  id?: number;
  name: string;
};

export interface KeywordCreattionAttributes extends Optional<IKeywordAttributes, 'id'> {}

export class Keyword extends Model<IKeywordAttributes, KeywordCreattionAttributes>
  implements IKeywordAttributes {
  public id!: number;
  public name!: string;
  
  public static associations: {
  };
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
    modelName: 'Keyword',
    tableName: 'keywords',
    sequelize,
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);