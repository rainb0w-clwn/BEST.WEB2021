var express = require('express');
const router = express.Router();
const {Joi, celebrate} = require("celebrate");
var middlewares = require('../../middlewares');
var {Logger} = require('../../../utlis');
var config = require('../../../config');

module.exports = (app) => {
    app.use('/product', router);

    router.get('/',
        async function (req, res, next) {
        });

};

