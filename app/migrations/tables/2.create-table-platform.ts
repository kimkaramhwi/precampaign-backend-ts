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


import { Platform } from "../../models/platform.model";

console.log(`
  ooooooooooooooooooooooo
  Create Platforms Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_platform = async() => {
    await Platform.sync({ force :false })
    .then(() => {
      console.log("Success Create Platforms Table");
    })
    .catch((err) => {
      console.log(`Error In Create Platform Table : ${err}`);
  });
}

create_table_platform();