import { Request, Response } from "express";
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
        include: [
          {
            model: Platform,
            as: "platforms",
            attributes: ["name"]
          },
          {
            model: Campaign,
            as: "campaign_applicants",
            attributes: ["title"]
          },
        ]
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
      let keywords = []
      let platforms = []
      // for (const j in applicants[i].campaigns) {
      //   campaigns.push(applicants[i].campaigns[j].title)
      // }

      for (const j in applicants[i].keywords) {
          keywords.push(applicants[i].keywords[j].name)
      }

      for (const j in applicants[i].applicant_campaigns) {
          platforms.push(applicants[i].applicant_campaigns[j].platforms[0].name)
          campaigns.push(applicants[i].applicant_campaigns[j].campaign_applicants.title)
      }

        data.push({
            "id": applicants[i].id,
            "name": applicants[i].name,
            "gender": applicants[i].gender,
            "height": applicants[i].height,
            "weight": applicants[i].weight,
            "thumbnail_url": applicants[i].thumbnail_url,
            "platforms": platforms,
            "keywords": keywords,
            "campaigns": campaigns
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
      res.status(201).send({
        "rateAvg": Math.round(((rate.background_rate + rate.trend_rate + rate.creativity_rate) / 3) * 10 ) / 10
      })
    } else {
      rate.update({
        background_rate: background_rate,
        trend_rate: trend_rate,
        creativity_rate: creativity_rate
      })
      res.status(200).send({
        "rateAvg": Math.round(((rate.background_rate + rate.trend_rate + rate.creativity_rate) / 3) * 10 ) / 10
      })
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