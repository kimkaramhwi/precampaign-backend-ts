const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync().then(() => {
// initial(); // Just use it in development, at the first time execution!. Delete it in production
});

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});