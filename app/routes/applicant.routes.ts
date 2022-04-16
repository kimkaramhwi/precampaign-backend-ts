import express from "express";
import {verifyToken} from "../middlewares/authJwt";
// import applicantcontroller from "../controllers/applicant.controller";

const router = express.Router();

router.use(verifyToken);
// router.get("", applicantcontroller.selectedApplicantFindAll);
// router.get("/rate/:id", applicantcontroller.applicantRate);
// router.post("/rate", applicantcontroller.rateCreateOrUpdate);

export default router;