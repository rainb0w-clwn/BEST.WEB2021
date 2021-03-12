var express = require("express");
var cookieParser = require("cookie-parser");
var routes = require('../api');
var config = require('../config');
var swagger = require("../_helper/swagger");
var useragent = require('express-useragent');
var requestIp = require('request-ip');

module.exports = async ({app}) => {
    app.enable('trust proxy');

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    if (process.env.NODE_ENV === 'development') {
        app.use(
            "/api-docs",
            swagger,
        );
    }

    app.use(useragent.express());
    app.use(requestIp.mw());

    app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({message: err.message})
                .end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
    // Return the express app
    return app;
};
