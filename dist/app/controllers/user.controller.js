"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    user_model_1.default.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email already exists!"
            });
            return;
        }
        else {
            user_model_1.default.create({
                name: name,
                email: email,
                password: bcryptjs_1.default.hashSync(password, 8)
            })
                .then(() => {
                res.send({ message: "User was registered successfully!" });
            })
                .catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    });
});
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    user_model_1.default.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.auth.secret);
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        });
    })
        .catch(err => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = {
    signup, signin
};
//# sourceMappingURL=user.controller.js.map