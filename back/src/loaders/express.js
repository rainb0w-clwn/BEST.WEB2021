const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require('../api');
const config = require('../config');
const swagger = require("../_helper/swagger");
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const {errors} = require('celebrate'); // handle celebrate joi errors


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

    app.use(errors());

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
