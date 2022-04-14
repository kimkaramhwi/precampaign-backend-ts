import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Keyword } from './keyword.model'

export interface IApplicantKeywordAttributes {
  id?: number;
  applicant_id: number;
  keyword_id: number;
  applicantIdKeyword?: any;
  keywordIdApplicant?: any;
}

export class ApplicantKeyword extends Model<IApplicantKeywordAttributes>
  implements IApplicantKeywordAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public keyword_id!: number;
  
  public static associations: {
    applicantIdKeyword: Association<Applicant, ApplicantKeyword>
    keywordIdApplicant: Association<Keyword, ApplicantKeyword>
  };
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
  }
)

Keyword.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'keyword_id',
  as: 'keywordIdApplicant'
});

ApplicantKeyword.belongsTo(Keyword, {
  foreignKey: 'keyword_id',
  as: 'keywordIdApplicant'
});

Applicant.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'applicantIdKeyword'
});

ApplicantKeyword.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  as: 'applicantIdKeyword'
});

export default ApplicantKeyword;