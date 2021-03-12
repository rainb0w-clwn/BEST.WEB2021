var Sequelize = require('sequelize');
let config = require('../config');
let env = process.env.NODE_ENV;
module.exports = async () => {
    const sequelize = new Sequelize(config[env]);
    await sequelize.authenticate();
    await sequelize.close();
};
