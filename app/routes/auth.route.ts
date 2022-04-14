import express from "express";
import {verifyToken} from "../middlewares/authJwt";
import authcontroller from "../controllers/auth.controller";

const router = express.Router();

router.get("/test", [verifyToken], authcontroller.Authorizeduser);

export default router;