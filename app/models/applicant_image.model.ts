import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { CampaignApplicant } from './campaign_applicant.model'

interface IApplicantImageAttributes {
  id?: number;
  campaign_applicant_id: number;
  image_url: string;

  applicantImages?: string[];
}

export class ApplicantImage extends Model<IApplicantImageAttributes>
  implements IApplicantImageAttributes {
  public id!: number;
  public name!: string;
  public campaign_applicant_id!: number;
  public image_url!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public static associations: {
    applicantImages: Association<CampaignApplicant, ApplicantImage>
    imagesApplicant: Association<ApplicantImage, CampaignApplicant>
  };
}

ApplicantImage.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    campaign_applicant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: CampaignApplicant,
        key: "id"
      }
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  },
  {
    modelName: 'applicant_image',
    sequelize,
  }
)

CampaignApplicant.hasMany(ApplicantImage, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: "applicantImages"
});

ApplicantImage.belongsTo(CampaignApplicant, {
  foreignKey: 'campaign_applicant_id',
  targetKey: 'id',
  as: "applicantImages",
  onDelete: 'CASCADE',
});

export default ApplicantImage;