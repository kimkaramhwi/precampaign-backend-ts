import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../models";
import Campaign from "../models/campaign.model";
import Applicant from "../models/appicant.model";
import CampaignApplicant from "../models/campaign_applicant.model";
import Rate from "../models/rate.model";
import User from "../models/user.model";
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
    const campaignId = parseInt(req.params.id);
    const limit = req.query.limit || 9;
    const offset = req.query.offset || 0;
    
    // Campaign.findAll({
    //     where: {
    //         id : campaignId
    //     },
    //     attributes: {
    //         exclude: ["createdAt", "updatedAt"]
    //     },
    //     include: [{ 
    //         model: Applicant,
    //         attributes: {
    //             exclude: ["createdAt", "updatedAt"]   
    //         },
            // include: [{
            //     model: CampaignApplicant,
            //     where: {
            //         campaign_id : campaignId
            //     },
            //     attributes: [
            //         "id", "is_selected"
            //     ],
            //     // include: [{
            //     //     model: Rate,
            //     //     attributes: {
            //     //         include: [
            //     //         [sequelize.literal('(SELECT ROUND(SUM(trend_rate + background_rate + creativity_rate)/3, 1) AS rates FROM rates)'), 'avg_rates']
            //     //         // [sequelize.literal('(SELECT ROUND(SUM(trend_rate + background_rate + creativity_rate)/3, 1) AS rates FROM rates WHERE rate.campaign_applicant_id = CampaignApplicant.id)'), 'avg_rates']
            //     //         // [sequelize.fn("AVG", sequelize.col("background_rate"), sequelize.col("trend_rate"), sequelize.col("creativity_rate")), "avg_rates"]
            //     //         ]
            //     //     },
            //     // }]
            // }]
    //     }]
    // })
    User.findAll({
        include: CampaignApplicant,

    })
    .then(data => {
      if (data.length === 0) {
        return res.status(404).send({
          message: `Not Found Campaign with id ${campaignId}`
        });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message: err.message
        });
      })
    };
  
  export default {
      create, findAll, campaignApplicantfindAll
  }
  