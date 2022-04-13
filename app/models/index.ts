import config from "../config/config";
import { Sequelize, DataTypes, Op } from "sequelize";

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
// this.Sequelize = Sequelize;
// this.Op = Op;
// this.sequelize = sequelize;

// this.user = require("./user.model")(sequelize, Sequelize, DataTypes);
// this.campaign = require("./campaign.model")(sequelize, Sequelize, DataTypes);
// this.applicant = require("./appicant.model")(sequelize, Sequelize, DataTypes);
// this.platform = require("./platform.model")(sequelize, Sequelize, DataTypes);
// this.keyword = require("./keyword.model")(sequelize, Sequelize, DataTypes);
// this.applicant_platform = require("./applicant_platform.model")(sequelize, Sequelize, DataTypes);
// this.applicant_keyword = require("./applicant_keyword.model")(sequelize, Sequelize, DataTypes);
// this.applicant_image = require("./applicant_image.model")(sequelize, Sequelize, DataTypes);
// this.campaign_applicant = require("./campaign_applicant.model")(sequelize, Sequelize, DataTypes);
// this.rate = require("./rate.model")(sequelize, Sequelize, DataTypes);
// };
// module.exports = db;