module.exports = (sequelize, Sequelize, DataTypes) => {
    const ApplicantImage = sequelize.define(
        'applicant_image',
        {
            applicant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            image_url: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        }, 
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );
    
    ApplicantImage.associate = db => {
        db.ApplicantImage.belongsTo(db.CampaignApplicant, {
            foreignKey: 'campaign_applicant_id'
        });
    };

    return ApplicantImage;
};