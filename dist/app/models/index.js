"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(config_1.default.db.DB_NAME, config_1.default.db.DB_USER, config_1.default.db.DB_PASS, {
    host: config_1.default.db.DB_HOST,
    dialect: "mysql",
});
exports.default = sequelize;
//# sourceMappingURL=index.js.map