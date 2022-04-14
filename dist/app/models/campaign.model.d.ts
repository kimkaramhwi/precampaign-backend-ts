import { Model, Optional } from "sequelize";
export declare enum STATUS_NAME {
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
export interface CampaignCreationAttributes extends Optional<ICampaignAttributes, "id"> {
}
declare class Campaign extends Model<ICampaignAttributes, CampaignCreationAttributes> implements ICampaignAttributes {
    id: number;
    name: string;
    status: STATUS_NAME;
    evaluation_start_date: Date;
    evaluation_end_date: Date;
    description: string;
    thumbnail_url: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Campaign;
