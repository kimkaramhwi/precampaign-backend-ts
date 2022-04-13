import express from "express";
//import authJwt from "../middlewares/authJwt";
import authcontroller from "../controllers/auth.controller";

const router = express.Router();

router.get("/test", authcontroller.Authorizeduser);

export default router;