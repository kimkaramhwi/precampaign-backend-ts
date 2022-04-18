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

  user_rate?: string[];
  applicant_rate?: string[];
  users?: string[];
  campaignApplicants?: string[];
}

export class Rate extends Model<IRateAttributes>
  implements IRateAttributes {
  [x: string]: any;
  static find(arg0: { include: { model: typeof CampaignApplicant; as: string; where: { campaign_id: string; }; }; }) {
      throw new Error("Method not implemented.");
  }
  public id!: number;
  public campaign_applicant_id!: number;
  public user_id!: number;
  public background_rate!: number;
  public trend_rate!: number;
  public creativity_rate!: number;

  public static associations: {
    user_rate: Association<User, Rate>
    applicant_rate: Association<CampaignApplicant, Rate>
    users: Association<User, CampaignApplicant>
    campaignApplicants: Association<CampaignApplicant, User>
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
      references: {
        model: CampaignApplicant,
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

CampaignApplicant.belongsToMany(User, {
  through: 'rate',
  foreignKey: 'campaign_applicant_id',
  as: "users"
});

CampaignApplicant.hasMany(Rate, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: "applicant_rate"
});

Rate.belongsTo(CampaignApplicant, {
  foreignKey: 'campaign_applicant_id',
  targetKey: 'id',
  as: "applicant_rate",
  onDelete: 'CASCADE',
});

User.belongsToMany(CampaignApplicant, {
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