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

const campaignApplicantfindAll = (req: Request, res: Response) => {
    const id = req.params.id;

    Applicant.findAll({
        include: [
            {
                model: CampaignApplicant,
                as: "applicant_campaigns",
                attributes: ["id"],
                where: {
                    campaign_id : id
                },
                include : [
                    {
                        model: Rate,
                        as: "applicant_rate",
                        attributes: [
                            [sequelize.literal(
                                `(SELECT (ROUND(SUM(trend_rate + background_rate + creativity_rate)/ (COUNT(user_id) * 3), 1)) AS rate_avg FROM rates WHERE rates.campaign_applicant_id = applicant_campaigns.id)`
                                ), 'rate_avg']
                        ]
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
                ],
            },
            {
                model: Campaign,
                as: "campaigns",
                where: {id : id},
                attributes: []
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
            const keywords = []

            for (const j in applicants[i].keywords) {
                keywords.push(applicants[i].keywords[j].name)
            }

            data.push({
                "id": applicants[i].id || [],
                "name": applicants[i].name || [],
                "gender": applicants[i].gender || [],
                "height": applicants[i].height || [],
                "weight": applicants[i].weight || [],
                "thumbnail": applicants[i].thumbnail_url || [],
                "contact": applicants[i].contact || [],
                "address": applicants[i].address || [],
                "platform": applicants[i].applicant_campaigns[0].platforms[0].name || [],
                "platform_account": applicants[i].applicant_campaigns[0].applicant_platforms[0].account_name || [],
                "campaign_applicant_id" : applicants[i].applicant_campaigns[0].id || [],
                "keywords": keywords,
                "rate" : applicants[i].applicant_campaigns[0].applicant_rate[0] || [],
            })
        }
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

const updateStatus = (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body.status;

    CampaignApplicant.findAll({
        include: [
            {
                model: Rate,
                as: "applicant_rate",
            },
        ],
        where: {
            campaign_id: id,
        },  
    })
    .then( data => {
        Campaign.update({ status: status }, { where: { id: id } })
        if (status === "Termination") {
            for (const i in data) {
                let rate_avg = 0
                for (let j = 0; j < data[i].applicant_rate.length; j++) {
                    rate_avg += ((data[i].applicant_rate[j].background_rate + data[i].applicant_rate[j].trend_rate + data[i].applicant_rate[j].creativity_rate) / 3)
                }

                if (rate_avg/data[i].applicant_rate.length >= 3) {
                    data[i].update({is_selected : true})
                }
            }
            res.status(200).send("SUCCESS")
        }
    })
    .catch ( err => {
        res.status(500).send({
            message: err.message
        })
    })
}

export default {
    create, 
    findAll, 
    campaignApplicantfindAll,
    updateStatus
}