var loaders = require('./loaders');
var express = require('express');
const config = require("./config");
var {Logger} = require('./utlis');

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




