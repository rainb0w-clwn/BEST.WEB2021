const expressLoader = require('./express');
const dbLoader = require('./database');
var {Logger} = require('../utlis');

module.exports = async ({expressApp}) => {
    await dbLoader();
    Logger.info('DB loaded and connected!');
    await expressLoader({app: expressApp});
    Logger.info('Express loaded');
    return expressApp;
};
