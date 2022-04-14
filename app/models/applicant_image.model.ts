import { Association, DataTypes, Model } from 'sequelize'
import sequelize from './index'
import { CampaignApplicant } from './campaign_applicant.model'

interface IApplicantImageAttributes {
  id?: number;
  campaign_applicant_id: number;
  image_url: string;
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
    applicantIdImage: Association<CampaignApplicant, ApplicantImage>
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

ApplicantImage.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: 'applicantIdImage'
});

CampaignApplicant.belongsTo(ApplicantImage, {
  as: 'applicantIdImage'
});

export default ApplicantImage;