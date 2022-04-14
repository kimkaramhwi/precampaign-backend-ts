"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import authJwt from "../middlewares/authJwt";
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.get("/test", auth_controller_1.default.Authorizeduser);
exports.default = router;
//# sourceMappingURL=auth.route.js.map