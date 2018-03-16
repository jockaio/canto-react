const Sequelize = require('sequelize');
const sequelizeConnection = new Sequelize('canto_dev', 'cantoxify_sys', 'canto', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelizeConnection,
  };
  
db.Word = db.sequelize.import('./dbModels');

module.exports = db;
