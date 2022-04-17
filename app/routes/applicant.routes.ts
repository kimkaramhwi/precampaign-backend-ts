import express from "express";
import {verifyToken} from "../middlewares/authJwt";
import applicantcontroller from "../controllers/applicant.controller"

const router = express.Router();

router.use(verifyToken);
router.get("/all-accepted-applicants-list", applicantcontroller.selectedApplicantFindAll);
router.post("/rate", applicantcontroller.rateCreateOrUpdate);

export default router;