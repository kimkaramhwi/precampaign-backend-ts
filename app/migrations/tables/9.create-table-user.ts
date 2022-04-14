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


import { User } from "../../models/user.model";

console.log(`
  oooooooooooooooooooooooooooo
  Create user Table
  oooooooooooooooooooooooooooo
  `);
  
  const create_table_user = async() => {
    await User.sync({ force : false })
    .then(() => {
      console.log("Success Create User Table");
    })
    .catch((err) => {
      console.log(`Error In Create User Table : ${err}`);
  });
}

create_table_user();