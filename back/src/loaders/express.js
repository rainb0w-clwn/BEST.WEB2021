const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require('../api');
const config = require('../config');
const swagger = require("../_helper/swagger");
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const {errors} = require('celebrate'); // handle celebrate joi errors
const {Logger} = require('../utlis');


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

    app.use((err, req, res, next) => {
        Logger.error('error: %o', err);
        let error = err.name;
        let message = err.message;
        let status = res.statusCode;
        switch (status) {
            case 400:
                error = 'Input Validation Error';
                break;
            case 401:
                error = 'Unauthorized';
                break;
            case 403:
                error = 'Forbidden';
                break;
            case 404:
                error = "Not Found";
                break;
            case 500:
                error = 'Internal Error';
                break;
        }
        switch (error) {
            case 'Unauthorized':
            case 'UnauthorizedError':
                status = 401;
                break;
            case 'SequelizeForeignKeyConstraintError':
                status = 400;
        }
        res.status(status).json({
            statusCode: status,
            message: message,
            error: error,
        });
    });
    // Return the express app
    return app;
};
