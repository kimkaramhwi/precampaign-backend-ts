import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { Applicant } from './appicant.model'
import { Campaign } from './campaign.model'
import { User } from './user.model'

interface IRateAttributes {
  id?: number;
  applicant_id: number;
  campaign_id: number;
  user_id: number;
  background_rate: number;
  trend_rate: number;
  creativity_rate: number;

  user_rate?: string[];
  applicant_rate?: string[];
  users?: string[];
  campaignApplicants?: string[];
}

export class Rate extends Model<IRateAttributes>
  implements IRateAttributes {
  public id!: number;
  public applicant_id!: number;
  public campaign_id!: number;
  public user_id!: number;
  public background_rate!: number;
  public trend_rate!: number;
  public creativity_rate!: number;

  public static associations: {
    user_rate: Association<User, Rate>
    applicant_rate: Association<Applicant, Rate>
    campaign_rate: Association<Campaign, Rate>
    user_applicants: Association<User, Applicant>
    user_campaigns: Association<User, Campaign>
    applicant_users: Association<Applicant, User>
    applicant_campaigns: Association<Applicant, Campaign>
    campaign_users: Association<Campaign, User>
    campaign_applicants: Association<Campaign, Applicant>
  };
}

Rate.init(
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
    campaign_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Campaign,
        key: "id"
      }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
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

Campaign.belongsToMany(User, {
  through: 'rate',
  foreignKey: 'campaign_id',
  as: "users"
});

Campaign.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'campaign_id',
  as: "campaign_rate"
});

Rate.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  targetKey: 'id',
  as: "campaign_rate",
  onDelete: 'CASCADE',
});

Applicant.belongsToMany(User, {
  through: 'rate',
  foreignKey: 'applicant_id',
  as: "users"
});

Applicant.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'applicant_id',
  as: "applicant_rate"
});

Rate.belongsTo(Applicant, {
  foreignKey: 'applicant_id',
  targetKey: 'id',
  as: "applicant_rate",
  onDelete: 'CASCADE',
});

User.belongsToMany(Campaign, {
  through: 'rate',
  foreignKey: 'user_id',
  as: "campaignApplicants"
});

User.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: "user_rate",
});

Rate.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: "user_rate",
  onDelete: 'CASCADE',
});

export default Rate;