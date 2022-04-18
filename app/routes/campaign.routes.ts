import express from "express";
import { verifyToken } from "../middlewares/authJwt";
import campaigncontroller from "../controllers/campaign.controller";
import applicantController from "../controllers/applicant.controller";

const router = express.Router();

router.use(verifyToken);
router.post("", campaigncontroller.create);
router.get("", campaigncontroller.findAll);
router.get("/:id", campaigncontroller.campaignApplicantfindAll);
router.patch("/:id", campaigncontroller.updateStatus);
router.get("/applicant-images/:id", applicantController.applicantImages);
router.get("/accepted-applicants-list/:id", applicantController.selectedCampaignApplicantFindAll);

export default router;