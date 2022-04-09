module.exports = (sequelize, Sequelize, DataTypes) => {
    const ApplicantKeyword = sequelize.define(
        'applicant_keyword',
        {
            applicant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            keyword_id: {
                type: Sequelize.INTEGER,
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
    
    ApplicantKeyword.associate = db => {
        db.ApplicantKeyword.belongsTo(db.Applicant, {
            as: 'applicant',
            foreignKey: 'applicant_id'
        });
        
        db.ApplicantKeyword.belongsTo(db.Keyword, {
            as: 'keyword',
            foreignKey: 'keyword_id'
        });
    };

    return ApplicantKeyword;
};