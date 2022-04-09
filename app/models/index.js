const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.campaign = require("./campaign.model")(sequelize, Sequelize, DataTypes);
db.applicant = require("./appicant.model")(sequelize, Sequelize, DataTypes);
db.platform = require("./platform.model")(sequelize, Sequelize, DataTypes);
db.keyword = require("./keyword.model")(sequelize, Sequelize, DataTypes);
db.applicant_platform = require("./applicant_platform.model")(sequelize, Sequelize, DataTypes);
db.applicant_keyword = require("./applicant_keyword.model")(sequelize, Sequelize, DataTypes);
db.applicant_image = require("./applicant_image.model")(sequelize, Sequelize, DataTypes);
db.campaign_applicant = require("./campaign_applicant.model")(sequelize, Sequelize, DataTypes);
db.rate = require("./rate.model")(sequelize, Sequelize, DataTypes);


module.exports = db;