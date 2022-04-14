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


import { ApplicantImage } from "../../models/applicant_image.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create applicantimages Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_applicantimage = async() => {
    await ApplicantImage.sync({ force : true })
    .then(() => {
      console.log("Success Create ApplicantImages Table");
    })
    .catch((err) => {
      console.log(`Error In Create ApplicantImage Table : ${err}`);
  });
}

create_table_applicantimage();