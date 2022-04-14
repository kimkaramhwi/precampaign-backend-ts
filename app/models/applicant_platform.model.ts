import { DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Platform } from './platform.model'

export interface IApplicantPlatformAttributes {
  id?: number;
  applicant_id: number;
  platform_id: number;
  account_name: string;
}

export class ApplicantPlatform extends Model<IApplicantPlatformAttributes>
  implements IApplicantPlatformAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
  public platform_id!: number;
  public account_name!: string;
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
    freezeTableName: true
  }
)

Platform.belongsToMany(Applicant, {
  through: 'applicant_platform',
  foreignKey: 'platform_id',
  onDelete: 'CASCADE',
});

Platform.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'platform_id',
});

ApplicantPlatform.belongsTo(Platform, {
  foreignKey: 'platform_id',
  onDelete: 'CASCADE',
});

Applicant.belongsToMany(Platform, {
  through: 'applicant_platform',
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

Applicant.hasMany(ApplicantPlatform, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
});

ApplicantPlatform.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

export default ApplicantPlatform;