module.exports = (sequelize, Sequelize, DataTypes) => {
    const Platform = sequelize.define(
        'platform',
        {
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, 
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    Platform.associate = db => {
        db.platform.belongsToMany(db.applicant, {
            through: 'applicant_platform',
            foreignKey: 'platform_id'
        });
    };

    return Platform;
};