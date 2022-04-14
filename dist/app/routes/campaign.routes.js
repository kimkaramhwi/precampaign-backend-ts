"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import {verifyToken} from "../middlewares/authJwt";
const campaign_controller_1 = __importDefault(require("../controllers/campaign.controller"));
const router = express_1.default.Router();
//router.use(verifyToken);
router.post("", campaign_controller_1.default.create);
router.get("", campaign_controller_1.default.findAll);
router.get("/:id", campaign_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=campaign.routes.js.map