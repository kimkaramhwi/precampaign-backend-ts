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


import { Rate } from "../../models/rate.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create Rate Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_rate = async() => {
    await Rate.sync({ force : false })
    .then(() => {
      console.log("Success Create Rate Table");
    })
    .catch((err) => {
      console.log(`Error In Create Rate Table : ${err}`);
  });
}

create_table_rate();