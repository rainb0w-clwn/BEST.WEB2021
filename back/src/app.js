const loaders = require('./loaders');
const express = require('express');
const config = require("./config");
const {Logger} = require('./utlis');

StartServer();

async function StartServer() {
    const app = express();
    await loaders({expressApp: app});
    app.listen(config.port, () => {
        Logger.info(`
      ################################################
         Server listening on port: ${config.port} ️
      ################################################
    `);
    }).on('error', (err) => {
        Logger.error(err);
        process.exit(1);
    });
}
