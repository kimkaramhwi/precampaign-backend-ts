import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../models";

export enum STATUS_NAME {
    Ongoing = "Ongoing",
    Termination = "Termination"
}

export interface ICampaignAttributes {
    id: number;
    name: string;
    status: STATUS_NAME;
    evaluation_start_date: Date;
    evaluation_end_date: Date;
    description: string;
    thumbnail_url: string;
}

export interface CampaignCreationAttributes extends Optional<ICampaignAttributes, "id"> {}

class Campaign extends Model<ICampaignAttributes, CampaignCreationAttributes>
    implements ICampaignAttributes {
        public id!: number;
        public name!: string;
        public status: STATUS_NAME;
        public evaluation_start_date: Date;
        public evaluation_end_date: Date;
        public description: string;
        public thumbnail_url: string;

        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    };
Campaign.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Ongoing', 'Termination'),
        allowNull: false,
    },
    evaluation_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    evaluation_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    thumbnail_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Campaigns"
})

export default Campaign;