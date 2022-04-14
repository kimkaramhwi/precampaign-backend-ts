import { Model, Optional } from "sequelize";
export interface IUserAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
}
export interface UserCreationAttributes extends Optional<IUserAttributes, "id"> {
}
declare class User extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
