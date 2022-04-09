module.exports = (sequelize, Sequelize, DataTypes) => {
    const ApplicantPlatform = sequelize.define(
        'applicant_platform',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            applicant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'applicants',
                    key: 'id',
                }
            },
            platform_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'platforms',
                    key: 'id',
                }
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

    return ApplicantPlatform;
};