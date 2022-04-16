import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Campaign } from './campaign.model'

interface ICampaignApplicantAttributes {
  id?: number;
  applicant_id: number;
  campaign_id: number;
  is_selected: boolean;

  campaigns?: string[];
  applicants?: string[];
  applicant_campaigns?: string[];
  campaign_applicants?: string[];
}

export class CampaignApplicant extends Model<ICampaignApplicantAttributes>

  implements ICampaignApplicantAttributes {
  public id!: number;
  public applicant_id!: number;
  public campaign_id!: number;
  public is_selected!: boolean;
  
  public static associations: {
    applicant_campaigns: Association<Applicant, CampaignApplicant>
    campaign_applicants: Association<Campaign, CampaignApplicant>
    applicants: Association<Applicant, Campaign>
    campaigns: Association<Campaign, Applicant>
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
      references: {
        model: Applicant,
        key: 'id',
      } 
    },
    campaign_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Campaign,
        key: 'id',
      } 
    },
    is_selected: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'campaign_applicant',
    timestamps: false,
    sequelize,
    freezeTableName: true
  }
)

Campaign.belongsToMany(Applicant, {
  through: 'campaign_applicant',
  foreignKey: 'campaign_id',
  as: 'applicants'
});

Campaign.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'campaign_id',
  as: 'campaign_applicants'
});

CampaignApplicant.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  targetKey: 'id',
  as: 'campaign_applicants',
  onDelete: 'CASCADE'
});

Applicant.belongsToMany(Campaign, {
  through: 'campaign_applicant',
  foreignKey: 'applicant_id',
  as: 'campaigns'
});

Applicant.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'applicant_campaigns'
});

CampaignApplicant.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  targetKey: 'id',
  as: 'applicant_campaigns',
  onDelete: 'CASCADE'
});

export default CampaignApplicant