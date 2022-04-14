import dotenv from "dotenv"
dotenv.config()
import config from "../config/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: "mysql",
  }
);

export default sequelize;