var express = require('express');
const router = express.Router();
var {Logger} = require('../../../utlis');

module.exports = (app) => {
    app.use('/', router);

    router.get('/test',
        async function (req, res, next) {
            const {login, email, password} = req.body;
            const {ip} = req.clientIp;
            const {source, browser, os} = req.useragent;
            const {lastname, firstname} = req.body || '123';
        console.log(login, email, password, ip, source, browser, os, lastname, firstname);
        res.json(req.clientIp);
        });
};
