module.exports = (sequelize, Sequelize, DataTypes) => {
    const Campaign = sequelize.define(
        'campaign',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('In Progress', 'Complete'),
                allowNull: false,
            },
            evaluation_start_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            evaluation_end_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            thumbnail_url: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
        }, 
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    return Campaign;
};