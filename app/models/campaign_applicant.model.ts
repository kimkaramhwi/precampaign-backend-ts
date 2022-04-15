import { DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Campaign } from './campaign.model'

interface ICampaignApplicantAttributes {
  id?: number;
  applicant_id: number;
  campaign_id: number;
  is_selected: boolean;
}

export class CampaignApplicant extends Model<ICampaignApplicantAttributes>
  implements ICampaignApplicantAttributes {
  public id!: number;
  public applicant_id!: number;
  public campaign_id!: number;
  public is_selected!: boolean;
}

CampaignApplicant.init(
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
    campaign_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    is_selected: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    modelName: 'campaign_applicant',
    sequelize,
    freezeTableName: true
  }
)

Campaign.belongsToMany(Applicant, {
  through: 'campaign_applicant',
  foreignKey: 'campaign_id',
  onDelete: 'CASCADE',
});

Campaign.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'campaign_id',
});

CampaignApplicant.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  onDelete: 'CASCADE',
});

Applicant.belongsToMany(Campaign, {
  through: 'campaign_applicant',
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

Applicant.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
});

CampaignApplicant.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});

export default CampaignApplicant;