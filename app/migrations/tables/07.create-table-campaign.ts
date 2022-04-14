import { Campaign } from "../../models/campaign.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create Campaigns Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_campaign = async() => {
    await Campaign.sync({ force : false })
    .then(() => {
      console.log("Success Create Campaign Table");
    })
    .catch((err) => {
      console.log(`Error In Create Campaign Table : ${err}`);
  });
}

create_table_campaign();