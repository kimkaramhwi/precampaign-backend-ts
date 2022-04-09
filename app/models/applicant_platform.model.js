module.exports = (sequelize, Sequelize, DataTypes) => {
    const ApplicantPlatform = sequelize.define(
        'applicant_platform',
        {
            applicant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            platform_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            account_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        }, 
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            freezeTableName: true
        }
    );
    
    ApplicantPlatform.associate = db => {
        db.ApplicantPlatform.belongsTo(db.Applicant, {
            as: 'applicant',
            foreignKey: 'applicant_id'
        });
        
        db.ApplicantPlatform.belongsTo(db.Platform, {
            as: 'platform',
            foreignKey: 'platform_id'
        });
    };

    return ApplicantPlatform;
};