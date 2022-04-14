"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_NAME = void 0;
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
var STATUS_NAME;
(function (STATUS_NAME) {
    STATUS_NAME["Ongoing"] = "Ongoing";
    STATUS_NAME["Termination"] = "Termination";
})(STATUS_NAME = exports.STATUS_NAME || (exports.STATUS_NAME = {}));
class Campaign extends sequelize_1.Model {
}
;
Campaign.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Ongoing', 'Termination'),
        allowNull: false,
    },
    evaluation_start_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    evaluation_end_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    thumbnail_url: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    }
}, {
    sequelize: models_1.default,
    modelName: "campaigns"
});
exports.default = Campaign;
//# sourceMappingURL=campaign.model.js.map