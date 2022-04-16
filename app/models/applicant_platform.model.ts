import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Platform } from './platform.model'

interface IApplicantPlatformAttributes {
  id?: number;
  applicant_id: number;
  platform_id: number;
  account_name: string;

  applicants?: string[];
  platfroms?: string[];
  applicant_platforms?: string[];
  platform_applicants?: string[];
}

export class ApplicantPlatform extends Model<IApplicantPlatformAttributes>
  implements IApplicantPlatformAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public platform_id!: number;
  public account_name!: string;

  public static associations: {
    applicant_platforms: Association<Applicant, ApplicantPlatform>
    platform_applicants: Association<Platform, ApplicantPlatform>
    applicants: Association<Applicant, Platform>
    platforms: Association<Platform, Applicant>
  };
}

ApplicantPlatform.init(
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
        key: 'id',
      }
    },
    platform_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Platform,
        key: 'id',
      }
    },
    account_name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  },
  {
    modelName: 'applicant_platform',
    sequelize,
    timestamps: false,
    freezeTableName: true
  }
)

Applicant.belongsToMany(Platform, {
  through: 'applicant_platform',
  foreignKey: 'applicant_id',
  as: 'platforms'
});

Applicant.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'applicant_platforms'
});

ApplicantPlatform.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  targetKey: 'id',
  as: 'applicant_platforms',
  onDelete: 'CASCADE',
});

Platform.belongsToMany(Applicant, {
  through: 'applicant_platform',
  foreignKey: 'platform_id',
  as: 'applicantss'
});

Platform.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'platform_id',
  as: 'platform_applicants'
});

ApplicantPlatform.belongsTo(Platform, {
  foreignKey: 'platform_id',
  targetKey: 'id',
  as: 'platform_applicants',
  onDelete: 'CASCADE',
});

export default ApplicantPlatform;