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


import { ApplicantPlatform } from "../../models/applicant_platform.model";

console.log(`
  ooooooooooooooooooooooooooooooo
  Create applicantsplatform Table
  ooooooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantplatform = async() => {
    await ApplicantPlatform.sync({ force : true })
    .then(() => {
      console.log("Success Create ApplicantPlatform Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantPlatform Table : ${err}`);
  });
}

create_table_applicantplatform();