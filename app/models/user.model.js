module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, 
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    User.associate = db => {
        db.User.belongsToMany(db.CampaignApplicant, {
            through: 'rate',
            foreignKey: 'user_id'
        });
    };
    return User;
};