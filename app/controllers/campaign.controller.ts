import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../models";
import Applicant from "../models/appicant.model";
import Campaign from "../models/campaign.model";
import CampaignApplicant from "../models/campaign_applicant.model";
import { ICampaignAttributes } from "../models/campaign.model";
import Platform from "../models/platform.model";
import ApplicantPlatform from "../models/applicant_platform.model";
import ApplicantImage from "../models/applicant_image.model";
import Keyword from "../models/keyword.model";
import ApplicantKeyword from "../models/applicant_keyword.model";
import Rate from "../models/rate.model";

const create = async (req: Request, res: Response) => {
    console.log(req.body)
    const { title, status, evaluation_start_date, evaluation_end_date, description, thumbnail_url }: ICampaignAttributes = req.body;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const campaign = {
        title: title,
        status: status,
        evaluation_start_date: evaluation_start_date,
        evaluation_end_date: evaluation_end_date,
        description: description,
        thumbnail_url: thumbnail_url
    };

    Campaign.create(campaign)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

interface Query {
    status: string;
    limit: any;
    offset: any;
    sort_by: string;
    sort_order: string;
}

const findAll = async (req: Request, res: Response) => {
    const { status, limit, offset, sort_by, sort_order } = req.query as unknown as Query;
    var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

    if (sort_by === "count") {
        Campaign.findAll({
            limit: limit * 1 || 9,
            offset: offset * 1 || 0,
            attributes: [
                'id', 'title', 'status', 'evaluation_start_date', 'evaluation_end_date', 'description', 'thumbnail_url', 'createdAt', 'updatedAt',
                [sequelize.literal('(SELECT COUNT(*) FROM campaign_applicant WHERE campaign_applicant.campaign_id = Campaign.id)'), 'applicant_count']],
            order: [[sequelize.literal('applicant_count'), sort_order || "DESC"]]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.send(500).send({
                    message: err.message
                });
            });
    } else {
        Campaign.findAll({
            where: condition,
            limit: limit * 1 || 9,
            offset: offset * 1 || 0,
            order: [[sort_by || "id", sort_order || "ASC"]]
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
};

const findOne = async (req: Request, res: Response) => {
    const id = req.params.id;

    Applicant.findAll({
        include: [
            {
                model: CampaignApplicant,
                as: "applicant_campaigns",
                attributes: ["id"],
                include : [{
                    model: Rate,
                    as: "applicant_rate"
                }],
            },
            {
                model: Campaign,
                as: "campaigns",
                where: {id : id},
                attributes: []
            },
            {
                model: ApplicantPlatform,
                as: "applicant_platforms",
                attributes: ["account_name"]
            },
            {
                model: Platform,
                as: "platforms",
                attributes: ["name"]
            },
            {
                model: ApplicantKeyword,
                as: "applicant_keywords",
                attributes: []
            },
            {
                model: Keyword,
                as: "keywords",
                attributes: ["name"]
            }
        ]
    })
        .then(applicants => {
            let data = []
            for (const i in applicants) {
                data.push({
                    "id": applicants[i].id,
                    "name": applicants[i].name,
                    "gender": applicants[i].gender,
                    "height": applicants[i].height,
                    "weight": applicants[i].weight,
                    "thumbnail_url": applicants[i].thumbnail_url,
                    "contact": applicants[i].contact,
                    "address": applicants[i].address,
                    "platform": applicants[i].platforms[0].name,
                    "platform_account": applicants[i].applicant_platforms[0].account_name,
                    "keyword": applicants[i].keywords[0].name
                })
            }
            // console.log("platform_account :"  + applicants[0].platforms.name)
            res.send({"applicants" : applicants});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

export default {
    create, findAll, findOne
}
