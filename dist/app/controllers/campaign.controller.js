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
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    auth_controller_1.default;
    const { name, status, evaluation_start_date, evaluation_end_date, description, thumbnail_url } = req.body;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const campaign = {
        name: name,
        status: status,
        evaluation_start_date: evaluation_start_date,
        evaluation_end_date: evaluation_end_date,
        description: description,
        thumbnail_url: thumbnail_url
    };
    campaign_model_1.default.create(campaign)
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
// interface Query {
//     status: string;
//     limit: number;
//     offset: number;
//     sort_by: string;
//     sort_order: string;
// }
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const { status, limit, offset, sort_by, sort_order } = req.query as unknown as Query;
    const status = req.query.status;
    const limit = req.query.limit || 9;
    const offset = req.query.offset || 0;
    const sort_by = req.query.sort_by || "id";
    const sort_order = req.query.sort_order && req.query.sort_order === "desc" ? "desc" : "asc";
    var condition = status ? { status: { [sequelize_1.Op.like]: `%${status}%` } } : null;
    if (sort_by === "count") {
        campaign_model_1.default.findAll({
            limit: limit,
            offset: offset,
            attributes: [
                'id', 'name', 'status', 'evaluation_start_date', 'evaluation_end_date', 'description', 'thumbnail_url', 'createdAt', 'updatedAt',
                [models_1.default.literal('(SELECT COUNT(*) FROM campaign_applicant WHERE campaign_applicant.campaign_id = Campaign.id)'), 'applicant_count']
            ],
            order: [[models_1.default.literal('applicant_count'), sort_order]]
        })
            .then(data => {
            res.send(data);
        })
            .catch(err => {
            res.send(500).send({
                message: err.message
            });
        });
    }
    else {
        campaign_model_1.default.findAll({
            where: condition,
            limit: limit,
            offset: offset,
            //   order: [[sort_by, sort_order]]
        })
            .then(data => {
            res.send(data);
        })
            .catch(err => {
            res.send(500).send({
                message: err.message
            });
        });
    }
});
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    campaign_model_1.default.findByPk(id)
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.default = {
    create, findAll, findOne
};
//# sourceMappingURL=campaign.controller.js.map