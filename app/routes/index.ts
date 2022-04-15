import { Router } from "express";
import authrouter from "./auth.route";
import userrouter from "./user.routes";
import campaignrouter from "./campaign.routes";
import applicantrouter from "./applicant.routes";

const router = Router();

router.use("/auth", authrouter);
router.use("/users", userrouter);
router.use("/campaigns", campaignrouter);
router.use("/applicants", applicantrouter);

export default router;