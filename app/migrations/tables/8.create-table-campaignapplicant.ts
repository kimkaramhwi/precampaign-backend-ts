// 'use strict';

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };


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