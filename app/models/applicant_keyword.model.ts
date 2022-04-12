module.exports = (sequelize, Sequelize) => {
  const ApplicantKeyword = sequelize.define(
    'applicant_keyword',
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
        keyword_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'keywords',
                key: 'id',
            }
        },
    },
    {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true
    }
  );
  return ApplicantKeyword;
};