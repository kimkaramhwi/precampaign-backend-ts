import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./app/routes/index";
import config from "./app/config/config";
import sequelize from "./app/models";

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

app.use(express.json());
app.use(routes);

sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome Precampaign!" });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});