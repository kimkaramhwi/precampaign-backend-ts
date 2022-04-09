module.exports = (sequelize, Sequelize, DataTypes) => {
  const ApplicantImage = sequelize.define(
      'applicant_image',
      {
        //   applicant_id: {
        //       type: Sequelize.INTEGER,
        //       allowNull: false,
        //   },
          image_url: {
              type: Sequelize.STRING(200),
              allowNull: false,
          },
      }, 
      {
          timestamps: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
          freezeTableName: true
      }
  );
  
  ApplicantImage.associate = db => {
      db.ApplicantImage.belongsTo(db.Applicant, {
          foreignKey: 'applicant_id'
      });
      
      db.ApplicantImage.belongsTo(db.Campaign, {
          foreignKey: 'campaign_id'
      });
  };

  return ApplicantImage;
};