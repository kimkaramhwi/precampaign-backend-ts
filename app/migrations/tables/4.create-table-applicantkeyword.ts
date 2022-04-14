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


import { ApplicantKeyword } from "../../models/applicant_keyword.model";

console.log(`
  oooooooooooooooooooooooopoooo
  Create applicantkeyword Table
  ooooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantkeyword = async() => {
    await ApplicantKeyword.sync({ force : false })
    .then(() => {
      console.log("Success Create ApplicantKeyword Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantKeyword Table : ${err}`);
  });
}

create_table_applicantkeyword();