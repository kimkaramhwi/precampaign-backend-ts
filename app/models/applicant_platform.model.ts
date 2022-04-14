import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Platform } from './platform.model'

export interface IApplicantPlatformAttributes {
  id?: number;
  applicant_id: number;
  platform_id: number;
  account_name: string;
  applicantIdPlatform?: any;
  platformIdApplicant?: any;
}

export class ApplicantPlatform extends Model<IApplicantPlatformAttributes>
  implements IApplicantPlatformAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public platform_id!: number;
  public account_name!: string;
  
  public static associations: {
    applicantIdPlatform: Association<Applicant, ApplicantPlatform>
    platformIdApplicant: Association<Platform, ApplicantPlatform>
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
    },
    platform_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
  }
)

Platform.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'platform_id',
  as: 'platformIdApplicant'
});

ApplicantPlatform.belongsTo(Platform, {
  foreignKey: 'platform_id',
  as: 'platformIdApplicant'
});

Applicant.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'applicantIdPlatform'
});

ApplicantPlatform.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  as: 'applicantIdPlatform'
});

export default ApplicantPlatform;