import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../models";
import Campaign from "../models/campaign.model";
import { ICampaignAttributes } from "../models/campaign.model";

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

const findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    Campaign.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const updateStatus = (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body.status;

    Campaign.update({ status: status }, { where: { id: id } })
        .then(data => {
            res.status(200).send({ message: "Success!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

export default {
    create, findAll, findOne, updateStatus
}
