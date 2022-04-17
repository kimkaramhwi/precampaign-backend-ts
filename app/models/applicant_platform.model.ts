import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { CampaignApplicant } from './campaign_applicant.model'
import { Platform } from './platform.model'

interface IApplicantPlatformAttributes {
  id?: number;
  campaign_applicant_id: number;
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
  public campaign_applicant_id!: number;
  public platform_id!: number;
  public account_name!: string;

  public static associations: {
    applicant_platforms: Association<CampaignApplicant, ApplicantPlatform>
    platform_applicants: Association<Platform, ApplicantPlatform>
    applicants: Association<CampaignApplicant, Platform>
    platforms: Association<Platform, CampaignApplicant>
  };
}

ApplicantPlatform.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    campaign_applicant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: CampaignApplicant,
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

CampaignApplicant.belongsToMany(Platform, {
  through: 'applicant_platform',
  foreignKey: 'campaign_applicant_id',
  as: 'platforms'
});

CampaignApplicant.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: 'applicant_platforms'
});

ApplicantPlatform.belongsTo(CampaignApplicant, {
  foreignKey: 'campaign_applicant_id',
  targetKey: 'id',
  as: 'applicant_platforms',
  onDelete: 'CASCADE',
});

Platform.belongsToMany(CampaignApplicant, {
  through: 'applicant_platform',
  foreignKey: 'platform_id',
  as: 'applicants'
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