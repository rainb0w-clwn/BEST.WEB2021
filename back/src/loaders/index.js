const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
var {Logger} = require('../utlis');

module.exports = async ({expressApp}) => {
    await mongooseLoader();
    Logger.info('DB loaded and connected!');
    await expressLoader({app: expressApp});
    Logger.info('Express loaded');

    return expressApp;
};
