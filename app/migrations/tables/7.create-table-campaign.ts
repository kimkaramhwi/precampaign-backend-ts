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


import { Campaign } from "../../models/campaign.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create campaigns Table
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