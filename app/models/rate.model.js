module.exports = (sequelize, Sequelize, DataTypes) => {
    const Rate = sequelize.define(
        'rate',
        {
            campaign_applicant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            background_rate: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            trend_rate: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            creativity_rate: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
    
    Rate.associate = db => {
        db.Rate.belongsTo(db.CampaignApplicant, {
            foreignKey: 'campaign_applicant_id'
        });
        
        db.Rate.belongsTo(db.User, {
            foreignKey: 'user_id'
        });
    };

    return Rate;
};