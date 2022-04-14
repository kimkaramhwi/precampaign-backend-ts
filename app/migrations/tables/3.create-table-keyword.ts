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


import { Keyword } from "../../models/keyword.model";

console.log(`
  ooooooooooooooooooooooo
  Create Keyword Table
  ooooooooooooooooooooooo
  `);
  
  const create_table_keyword = async() => {
    await Keyword.sync({ force : true })
    .then(() => {
      console.log("Success Create Keyword Table");
    })
    .catch((err) => {
      console.log(`Error In Create Keyword Table : ${err}`);
  });
}

create_table_keyword();