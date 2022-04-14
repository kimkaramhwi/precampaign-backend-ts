// module.exports = (sequelize, Sequelize) => {
//   const ApplicantImage = sequelize.define(
//     'applicant_image',
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
//         image_url: {
//             type: Sequelize.STRING(200),
//             allowNull: false,
//         },
//     }, 
//     {
//         timestamps: true,
//         charset: 'utf8',
//         collate: 'utf8_general_ci'
//     }
//   );
//   return ApplicantImage;
// };
//# sourceMappingURL=applicant_image.model.js.map