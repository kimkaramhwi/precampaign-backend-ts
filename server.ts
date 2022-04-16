import express from "express";
import cors from "cors";
import routes from "./app/routes/index";
import config from "./app/config/config";
import sequelize from "./app/models";

const app = express();

app.use(cors());
app.use(express.json({ type: "*/*" }));
app.use(routes);

// sequelize.sync(); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome Precampaign!" });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});