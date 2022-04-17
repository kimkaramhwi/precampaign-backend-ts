import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../models";
import Campaign from "../models/campaign.model";
import Applicant from "../models/appicant.model";
import CampaignApplicant from "../models/campaign_applicant.model";
import Rate from "../models/rate.model";
import ApplicantKeyword from "../models/applicant_keyword.model";
import ApplicantPlatform from "../models/applicant_platform.model";
import Keyword from "../models/keyword.model";
import { ICampaignAttributes } from "../models/campaign.model";
import Platform from "../models/platform.model";

const create = (req: Request, res: Response) => {
    const { title, status, evaluation_start_date, evaluation_end_date, description, thumbnail_url }: ICampaignAttributes = req.body;
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
            res.status(500).send({ message: err.message });
        });

};

const findAll = (req: Request, res: Response) => {
    const status = req.query.status;
    const limit: number = parseInt(req.query.limit as string) || 9;
    const offset: number = parseInt(req.query.offset as string) || 0;
    const sort_by = req.query.sort_by as string || "id";
    const sort_order = req.query.sort_order as string || "ASC";
    const condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

    if (sort_by === "count") {
        Campaign.findAll({
            where: condition,
            limit: limit,
            offset: offset,
            attributes: {
                include: [[sequelize.literal('(SELECT COUNT(*) FROM campaign_applicant WHERE campaign_applicant.campaign_id = Campaign.id)'), 'applicant_count']]
            },
            order: [[sequelize.literal('applicant_count'), sort_order]]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else {
        Campaign.findAll({
            where: condition,
            limit: limit,
            offset: offset,
            order: [[sort_by, sort_order]]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};

const campaignApplicantfindAll = async (req: Request, res: Response) => {
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
            const platform_account = []
            const platform = []
            const keyword = []

            for (const j in applicants[i].applicant_platforms) {
                platform_account.push(applicants[i].applicant_platforms[j].account_name)
                platform.push(applicants[i].platforms[j].name)
            }
            
            for (const j in applicants[i].applicant_keywords) {
                keyword.push()
            }

            data.push({
                "id": applicants[i].id,
                "name": applicants[i].name,
                "gender": applicants[i].gender,
                "height": applicants[i].height,
                "weight": applicants[i].weight,
                "thumbnail": applicants[i].thumbnail_url,
                "contact": applicants[i].contact,
                "address": applicants[i].address,
                "platform": platform,
                "platform_account": platform_account,
                "keyword": applicants[i].keywords[0].name,
                "rate": 0
            })
        }
        res.status(200).send(data);
        // res.status(200).send(applicants);


    })
    // .catch(err => {
    //     res.status(500).send({
    //         message: err.message
    //     });
    // });
};

export default {
    create, findAll, campaignApplicantfindAll
}
  