const Sequelize = require('sequelize');
const config = require('../config');
const env = process.env.NODE_ENV;

module.exports = async () => {
    const sequelize = new Sequelize(config[env]);
    await sequelize.authenticate();
    await sequelize.close();
};
