import express from "express";
import usercontroller from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", usercontroller.signup);
router.post("/signin", usercontroller.signin);

export default router;