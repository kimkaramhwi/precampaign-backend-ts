import { Association, DataTypes, Model, Optional } from 'sequelize'
import sequelize from './index'
import { CampaignApplicant } from './campaign_applicant.model'

interface IApplicantImageAttributes {
  id?: number;
  applicant_id: number;
  image_url: string;
  applicantIdKeyword?: any;
  keywordIdApplicant?: any;
}

export interface ApplicantImageCreationAttributes extends Optional<IApplicantImageAttributes, "id"> {}

export class ApplicantImage extends Model<IApplicantImageAttributes, ApplicantImageCreationAttributes>
  implements IApplicantImageAttributes {
  public id!: number;
  public name!: string;
  public applicant_id!: number;
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
    applicant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  },
  {
    modelName: 'ApplicantImage',
    tableName: 'applicant_images',
    sequelize,
    freezeTableName: true
  }
);

ApplicantImage.hasMany(CampaignApplicant, {
  sourceKey: 'id',
  foreignKey: 'campaign_applicant_id',
  as: 'applicantIdImage'
});

CampaignApplicant.belongsTo(ApplicantImage, {
  as: 'applicantIdImage'
});