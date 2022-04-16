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
        attributes: []
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

    // [for (let j in applicants) j.name] 
    for (const i in applicants) {
      for (let j in applicants[i].campaigns) {
      // for (let j: number; j < applicants[i].campaigns.length; j++) {
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
            "campaign": applicants[i].campaigns[j].title
        })
      }
    }
    res.status(200).send({"applicants" : data});
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
};

const applicantRate = (req: Request, res: Response) => {
  const campaignApplicantId = parseInt(req.params.id);
  
  Applicant.findOne({
    where: {
      id: 2
    }
    // include: [{
    //   model: CampaignApplicant, 
    //   // where: {
    //     // id : campaignApplicantId
    // //   // },
    //   include: [{
    //     model: ApplicantImage,
    //     // where: {
    //     //   campaign_applicant_id : campaignApplicantId
    //     // },
    //     attributes: ["image_url"]
    //   }]
    // }],
  })
  .then(da => {
    res.send(da)
  })
};

// const hi = (req: Request, res: Response) => {
//   Campaign.findOne({
//     where: {
//       id :1
//     }
//   })
//   .then( data => {
//     applicantRate
//     res.status(200).send(data)
//   })
//   .catch( err => {
//   res.status(500).send({
//     message: err.message
//     })
//   })
// };
// }


// 
const rateCreateOrUpdate = (req: Request, res: Response) => {
  const userId = req.userId as unknown as number;
  const campaignId = req.params.id;
  const applicantId = req.body.applicant_id;
  const background_rate = req.body.background_rate;
  const trend_rate = req.body.trend_rate;
  const creativity_rate = req.body.creativity_rate;
  // const campaignApplicantId = CampaignApplicant.findOne({
  //   where: {
  //     campaign_id : campaignId,
  //     applicant_id : applicantId
  //   }
  // })[0].id
  // const Where = {
  //   user_id : userId,
  //   campaign_applicant_id : campaignApplicantId
  // };
  const createRate = {
    // campaign_applicant_id : campaignApplicantId,
    user_id : userId,
    background_rate: background_rate,
    trend_rate: trend_rate,
    creativity_rate: creativity_rate
  };
  
  Rate.findOne({
    include: {
      model: CampaignApplicant,
      as: "applicant_rate",
      where: {
        campaign_id: campaignId,
        applicant_id: applicantId,
      },
      attributes: []
    }
  })
  .then(rate => {
    if(!rate) { Rate.create({
      user_id : userId,
      campaign_applicant_id: applicantId,
      background_rate: background_rate,
      trend_rate: trend_rate,
      creativity_rate: creativity_rate
    })
    res.status(201).send({
      user_id : userId,
      campaign_applicant_id: applicantId,
      background_rate: background_rate,
      trend_rate: trend_rate,
      creativity_rate: creativity_rate
    })
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