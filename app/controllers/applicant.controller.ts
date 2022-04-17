import { Request, Response } from "express";
import { Op, QueryError } from "sequelize";
import sequelize from "../models";
import Campaign from "../models/campaign.model";
import Applicant from "../models/appicant.model";
import CampaignApplicant from "../models/campaign_applicant.model";
import Rate from "../models/rate.model";
import ApplicantImage from "../models/applicant_image.model";
import ApplicantKeyword from "../models/applicant_keyword.model";
import ApplicantPlatform from "../models/applicant_platform.model";
import Keyword from "../models/keyword.model";
import Platform from "../models/platform.model";

const selectedApplicantFindAll = (req: Request, res: Response) => {

  Applicant.findAll({
    attributes: ["thumbnail_url", "name", "gender", "height", "weight"],
    include: [
      {
        model: CampaignApplicant,
        as: "applicant_campaigns",
        where: {
          is_selected: true
        },
        // attributes: [],
      },
      {
        model: Campaign,
        as: "campaigns",
        attributes: ["title"]
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
    if (!applicants) {
      res.status(404).send({
        message: "Not Exist Applicant"
      })
    }

    let data = []
    
    for (const i in applicants) {
      let campaigns = []
      for (const j in applicants[i].campaigns) {
        campaigns.push(applicants[i].campaigns[j].title)
      }
        data.push({
            "id": applicants[i].id,
            "name": applicants[i].name,
            "gender": applicants[i].gender,
            "height": applicants[i].height,
            "weight": applicants[i].weight,
            "thumbnail_url": applicants[i].thumbnail_url,
            "platform": applicants[i].platforms[0].name,
            "platform_account": applicants[i].applicant_platforms[0].account_name,
            "keyword": applicants[i].keywords[0].name,   
            "campaign": campaigns
        })
    }
    res.status(200).send({"applicants" : data});
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
};

const selectedCampaignApplicantFindAll = (req: Request, res: Response) => {
  const campaignId = parseInt(req.params.id);

  Applicant.findAll({
    attributes: ["name", "gender", "birthdate", "address", "contact", "thumbnail_url"],
    include: [
      {
        model: CampaignApplicant,
        as: "applicant_campaigns",
        where: {
          is_selected: true,
          campaign_id: campaignId
        },
        attributes: []
      },
  ]
  })
  .then(applicants => {
    // if (!applicants) {
    //   res.status(404).send({
    //     message: "Not Exist Applicant"
    //   })
    // }
    res.status(200).send({"applicants" : applicants});
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
};

const applicantRate = (req: Request, res: Response) => {
  const campaignId = parseInt(req.params.id);
  const applicantId = req.query["applicant-id"];

  ApplicantImage.findAll({
    attributes: ["image_url"],
    include: {
      model: CampaignApplicant,
      as: "applicantImages",
      where: {
        applicant_id: applicantId,
        campaign_id: campaignId
      },
    },
  })
  .then(image => {
    let data = []
    for (const i in image) {
      data.push(image[i].image_url)
    }
    res.send({"image" : data})
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
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
    campaign_applicant_id : campaignApplicantId,
    user_id : userId,
    background_rate: background_rate,
    trend_rate: trend_rate,
    creativity_rate: creativity_rate
  };
  
  Rate.findOne({
      where: Where,
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
  rateCreateOrUpdate,
  selectedCampaignApplicantFindAll
}