const { sequelize } = require("../models");
const db = require("../models");
const Campaign = db.campaign;
const Op = db.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const campaign = {
        name: req.body.name,
        status: req.body.status,
        evaluation_start_date: req.body.evaluation_start_date,
        evaluation_end_date: req.body.evaluation_end_date,
        description: req.body.description,
        thumbnail_url: req.body.thumbnail_url
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

exports.findAll = (req, res) => {
    const status = req.query.status;
    const limit = parseInt(req.query.limit) || 9;
    const offset = parseInt(req.query.offset)|| 0;
    const sort_by = req.query.sort_by || "id";
    const sort_order = req.query.sort_order && req.query.sort_order === "desc" ? "desc" : "asc";
    var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

    if (sort_by === "count") {
        Campaign.findAll({
            attributes: [
                'id', 'name', 'status', 'evaluation_start_date', 'evaluation_end_date', 'description', 'thumbnail_url', 'createdAt', 'updatedAt',
                [sequelize.literal('(SELECT COUNT(*) FROM campaign_applicant WHERE campaign_applicant.campaign_id = Campaign.id)'), 'ApplicantCount']],
            order: [[sequelize.literal('ApplicantCount'), 'DESC']]
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
            limit: limit, 
            offset: offset,
            order: [
                [sort_by, sort_order]
            ]
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Campaign.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
