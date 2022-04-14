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


import { Applicant } from "../../models/appicant.model";

console.log(`
  ooooooooooooooooooooooo
  Create applicants Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_applicant = async() => {
    await Applicant.sync({ force : false })
    .then(() => {
      console.log("Success Create Applicants Table");
    })
    .catch((err) => {
      console.log(`Error In Create Applicant Table : ${err}`);
  });
}

create_table_applicant();