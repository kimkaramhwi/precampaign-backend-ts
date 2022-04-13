// module.exports = (sequelize, Sequelize) => {
//   const CampaignApplicant = sequelize.define(
//     'campaign_applicant',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         campaign_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'campaigns',
//                 key: 'id',
//             }
//         },
//         applicant_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'applicants',
//                 key: 'id',
//             }
//         },
//         is_selected: {
//             type: Sequelize.BOOLEAN,
//             allowNull: false,
//         },
//     }, 
//     {
//         timestamps: false,
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//         freezeTableName: true
//     }
//   );
//   return CampaignApplicant;
// };