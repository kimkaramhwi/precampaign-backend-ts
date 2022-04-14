// module.exports = (sequelize, Sequelize) => {
//   const Rate = sequelize.define(
//     'rate',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         campaign_applicant_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'campaign_applicant',
//                 key: 'id',
//             }
//         },
//         user_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'users',
//                 key: 'id',
//             }
//         },
//         background_rate: {
//             type: Sequelize.FLOAT,
//             allowNull: false,
//         },
//         trend_rate: {
//             type: Sequelize.FLOAT,
//             allowNull: false,
//         },
//         creativity_rate: {
//             type: Sequelize.FLOAT,
//             allowNull: false,
//         },
//     }, 
//     {
//         timestamps: false,
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//     }
//   );
//   return Rate;
// };
//# sourceMappingURL=rate.model.js.map