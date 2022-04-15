import express from "express";
import { checkDuplicateUserEmail } from "../middlewares/verifyUser";
import { passwordIsValid } from "../middlewares/verifyUser";
import usercontroller from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", [checkDuplicateUserEmail], usercontroller.signup);
router.post("/signin", [passwordIsValid], usercontroller.signin);

export default router;