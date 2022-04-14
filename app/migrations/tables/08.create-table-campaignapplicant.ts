import { CampaignApplicant } from "../../models/campaign_applicant.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create CampaignApplicant Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_CampaignApplicant = async() => {
    await CampaignApplicant.sync({ force : false })
    .then(() => {
      console.log("Success Create CampaignApplicant Table");
    })
    .catch((err) => {
      console.log(`Error In Create CampaignApplicant Table : ${err}`);
  });
}

create_table_CampaignApplicant();