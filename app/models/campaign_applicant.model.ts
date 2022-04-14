import { Association, DataTypes, Model, Optional } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Campaign } from './campaign.model'

interface ICampaignApplicantAttributes {
  id?: number;
  applicant_id: number;
  campaign_id: number;
  is_selected: boolean;
  applicantIdCampaign?: any;
  campaignIdApplicant?: any;
}

export class CampaignApplicant extends Model<ICampaignApplicantAttributes>
  implements ICampaignApplicantAttributes {
  public id!: number;
  public applicant_id!: number;
  public campaign_id!: number;
  public is_selected!: boolean;
  
  public static associations: {
    applicantIdCampaign: Association<Applicant, CampaignApplicant>
    CampaignIdApplicant: Association<Campaign, CampaignApplicant>
  };
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
);

Campaign.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'campaign_id',
  as: 'campaignIdApplicant'
});

CampaignApplicant.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  as: 'campaignIdApplicant'
});

Applicant.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'applicantIdCampaign'
});

CampaignApplicant.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  as: 'applicantIdCampaign'
});