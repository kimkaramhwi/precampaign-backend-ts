import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Keyword } from './keyword.model'

export interface IApplicantKeywordAttributes {
  id?: number;
  applicant_id: number;
  keyword_id: number;

  applicants?: string[];
  keywords?: string[];
  applicant_keywords?: string[];
  keyword_applicants?: string[];
}

export class ApplicantKeyword extends Model<IApplicantKeywordAttributes>
  implements IApplicantKeywordAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public keyword_id!: number;

  public static associations: {
    applicant_keywords: Association<Applicant, ApplicantKeyword>
    keyword_applicants: Association<Keyword, ApplicantKeyword>
    applicants: Association<Applicant, Keyword>
    keywords: Association<Keyword, Applicant>
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
      references: {
        model: Applicant,
        key: "id"
      }
    },
    keyword_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Keyword,
        key: "id"
      }
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
  as: "applicants"
});

Keyword.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'keyword_id',
  as: "keyword_applicants"
});

ApplicantKeyword.belongsTo(Keyword, {
  foreignKey: 'keyword_id',
  targetKey: 'id',
  as: "keyword_applicants",
  onDelete: 'CASCADE',
});

Applicant.belongsToMany(Keyword, {
  through: 'applicant_keyword',
  foreignKey: 'applicant_id',
  as: "keywords"
});

Applicant.hasMany(ApplicantKeyword, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: "applicant_keywords",
});

ApplicantKeyword.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  targetKey: 'id',
  as: "applicant_keywords",
  onDelete: 'CASCADE',
});

export default ApplicantKeyword;