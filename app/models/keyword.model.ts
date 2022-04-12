module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define(
    'keyword',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
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
  return Keyword;  
};