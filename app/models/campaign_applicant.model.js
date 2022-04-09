module.exports = (sequelize, Sequelize, DataTypes) => {
    const CampaignApplicant = sequelize.define(
        'campaign_applicant',
        {
                campaign_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                applicant_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                is_selected: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
            }, 
            {
                timestamps: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                freezeTableName: true
            }
    );
    
    CampaignApplicant.associate = db => {
        db.CampaignApplicant.belongsTo(db.Applicant, {
            foreignKey: 'applicant_id'
        });

        db.CampaignApplicant.belongsTo(db.Campaign, {
            foreignKey: 'campaign_id'
        });
      
        db.CampaignApplicant.belongsToMany(db.User, {
            through: 'rate',
            foreignKey: 'campaign_applicant_id'
        });
    };

  return CampaignApplicant;
};