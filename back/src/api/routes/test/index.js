const express = require('express');
const router = express.Router();
// const {Logger} = require('../../../utlis');
// const Models = require('../../../models');
const {Product} = require('../../../services');
module.exports = (app) => {
    app.use('/', router);

    router.get('/test',
        async function (req, res) {
            // const {Login, email, password} = req.body;
            // const {ip} = req.clientIp;
            // const {source, browser, os} = req.useragent;
            // const {lastname, firstname} = req.body || '123';
            // console.log(Login, email, password, ip, source, browser, os, lastname, firstname);
            let test0 = new Product();
            let test = await test0.getProducts({name: 'lol', category: 'lol23', rating: 4, priceFrom: 100, priceTo: 200, offset: 10, sortBy: {'price' : 'desc'}});
            res.send(test);
        });
};
