import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { CampaignApplicant } from './campaign_applicant.model'
import { User } from './user.model'

interface IRateAttributes {
  id?: number;
  campaign_applicant_id: number;
  user_id: number;
  background_rate: number;
  trend_rate: number;
  creativity_rate: number;
  userIdCampaignApplicant?: any;
  campaignApplicantIdUser?: any;
}

export class Rate extends Model<IRateAttributes>
  implements IRateAttributes {
  public id!: number;
  public campaign_applicant_id!: number;
  public user_id!: number;
  public background_rate!: number;
  public trend_rate!: number;
  public creativity_rate!: number;
  
  public static associations: {
    campaignApplicantIdUser: Association<CampaignApplicant, Rate>
    userIdCampaignApplicant: Association<User, Rate>
  };
}

Rate.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    campaign_applicant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    background_rate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    trend_rate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    creativity_rate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    
  },
  {
    timestamps: false,
    modelName: 'rate',
    sequelize,
  }
)

CampaignApplicant.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: 'campaignApplicantIdUser'
});

Rate.belongsTo(CampaignApplicant, {
  foreignKey: 'campaign_applicant_id',
  as: 'campaignApplicantIdUser'
});

User.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: 'userIdCampaignApplicant'
});

Rate.belongsTo(User, {
  foreignKey: 'applicant_id',
  as: 'userIdCampaignApplicant'
});

export default Rate;