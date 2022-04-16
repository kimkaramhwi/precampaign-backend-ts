import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../models";
import Campaign from "../models/campaign.model";
import Applicant from "../models/appicant.model";
import CampaignApplicant from "../models/campaign_applicant.model";
import Rate from "../models/rate.model";
import ApplicantImage from "../models/applicant_image.model";

const selectedApplicantFindAll = (req: Request, res: Response) => {
  Applicant.findAll({
    include: {
      model: CampaignApplicant,
      where: {
        is_selected: true
      },

    }
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const applicantRate = (req: Request, res: Response) => {
  const campaignApplicantId = parseInt(req.params.id);

  Applicant.findOne({
    include: [{
      model: CampaignApplicant, 
      // where: {
        // id : campaignApplicantId
      // },
      include: [{
        model: ApplicantImage,
        // where: {
        //   campaign_applicant_id : campaignApplicantId
        // },
        attributes: ["image_url"]
      }]
    }],
  }).then( data => {
    res.status(200).send(data)
  })
};

const rateCreateOrUpdate = (req: Request, res: Response) => {
  const userId = req.userId as unknown as number;
  const campaignApplicantId = req.body.campaign_applicant_id;
  const background_rate = req.body.background_rate;
  const trend_rate = req.body.trend_rate;
  const creativity_rate = req.body.creativity_rate;
  const Where = {
    user_id : userId,
    campaign_applicant_id : campaignApplicantId
  };
  const createRate = {
    user_id : userId,
    campaign_applicant_id : campaignApplicantId,
    background_rate: background_rate,
    trend_rate: trend_rate,
    creativity_rate: creativity_rate
  };
  
  Rate.findOne({
    where: Where
  })
    .then(rate => {
      if(!rate) { Rate.create(createRate)
        res.status(201).send(createRate)
      } else {
        rate.update({
          background_rate: background_rate,
          trend_rate: trend_rate,
          creativity_rate: creativity_rate
        })
        res.status(200).send(rate)
      }
    })
    .catch(err => {
      res.status(500).send({
        messge: err.message
      })
    });
}

export default {
  selectedApplicantFindAll,
  applicantRate,
  rateCreateOrUpdate
}