module.exports = (sequelize, Sequelize, DataTypes) => {
    const Applicant = sequelize.define(
        'applicant',
        {
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM('Male', 'Female', 'ETC'),
                allowNull: false,
            },
            height: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            thumbnail_url: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            birthdate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            contact: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, 
        {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    Applicant.associate = db => {
        db.applicant.belongsToMany(db.platform, {
            through: 'applicant_platform',
            foreignKey: 'applicant_id'
        });
    };

    return Applicant;
};