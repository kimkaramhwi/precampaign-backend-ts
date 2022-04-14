import { DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Keyword } from './keyword.model'

export interface IApplicantKeywordAttributes {
  id?: number;
  applicant_id: number;
  keyword_id: number;
}

export class ApplicantKeyword extends Model<IApplicantKeywordAttributes>
  implements IApplicantKeywordAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public keyword_id!: number;
}

ApplicantKeyword.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    applicant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    keyword_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'applicant_keyword',
    sequelize,
    timestamps: false,
    freezeTableName: true
  }
)

Keyword.belongsToMany(Applicant, {
  through: 'applicant_keyword',
  foreignKey: 'keyword_id',
  onDelete: 'CASCADE',
});

Keyword.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'keyword_id',
});

ApplicantKeyword.belongsTo(Keyword, {
  foreignKey: 'keyword_id',
  onDelete: 'CASCADE',
});

Applicant.belongsToMany(Keyword, {
  through: 'applicant_keyword',
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

Applicant.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
});

ApplicantKeyword.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

export default ApplicantKeyword;