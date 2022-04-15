import express from "express";
import { checkDuplicateUserEmail } from "../middlewares/verifySignUp";
import usercontroller from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", [checkDuplicateUserEmail], usercontroller.signup);
router.post("/signin", usercontroller.signin);

export default router;