import express from "express";
import { verifyToken } from "../middlewares/authJwt";
import campaigncontroller from "../controllers/campaign.controller";

const router = express.Router();

router.use(verifyToken);
router.post("", campaigncontroller.create);
router.get("", campaigncontroller.findAll);
router.get("/:id", campaigncontroller.findOne);
router.patch("/:id", campaigncontroller.updateStatus);

export default router;