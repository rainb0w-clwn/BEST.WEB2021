const express = require('express');
const {Joi, celebrate} = require("celebrate");
const {AuthService} = require("../../../services");
const middlewares = require('../../middlewares');
const router = express.Router();
const {Logger} = require('../../../utlis');

module.exports = (app) => {
    app.use('/auth', router);

    router.post('/signup',
        celebrate({
            body: Joi.object({
                login: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                lastname: Joi.string(),
                firstname: Joi.string(),
            }),
        }),
        async function (req, res, next) {
            const {login, email, password} = req.body;
            const {ip} = req.clientIp || null;
            const {source, browser, os} = req.useragent;
            const {lastname, firstname} = req.body || null;
            try {
                const authServiceInstance = new AuthService();
                const userData = await authServiceInstance.SignUp(login, password, ip, source, browser, os, email, lastname, firstname);
                authServiceInstance.setTokenCookie(res, userData.refreshToken);
                Reflect.deleteProperty(userData, 'refreshToken');
                return res.status(201).json(userData);
            } catch (e) {
                next(e);
            }
        });

    router.post('/signin',
        celebrate({
            body: Joi.object({
                login: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async function (req, res, next) {
            const {login, password} = req.body;
            const {ip} = req.clientIp || null;
            const {source, browser, os} = req.useragent;
            try {
                const authServiceInstance = new AuthService();
                const userData = await authServiceInstance.SignIn(login, password, ip, source, browser, os);
                authServiceInstance.setTokenCookie(res, userData.refreshToken);
                Reflect.deleteProperty(userData, 'refreshToken');
                return res.status(200).json(userData);
            } catch (e) {
                next(e);
            }
        });

    router.post('/update-token',
        celebrate({
            cookies: Joi.object({
                refreshToken: Joi.string().length(80).required(),
            }),
        }),
        async function (req, res, next) {
            const token = req.cookies.refreshToken;
            const {ip} = req.clientIp || null;
            const {source, browser, os} = req.useragent;
            const authServiceInstance = new AuthService();
            authServiceInstance.refreshToken(token, ip, source, browser, os)
                .then(({newToken, ...user}) => {
                    authServiceInstance.setTokenCookie(res, newToken);
                    res.json(user);
                })
                .catch(next);
        });

    router.post('/logout',
        celebrate({
            cookies: Joi.object({
                refreshToken: Joi.string().length(80).required(),
            }),
        }),
        async function (req, res, next) {
            try {
                const token = req.cookies.refreshToken;
                const authServiceInstance = new AuthService();
                await authServiceInstance.revokeToken(token);
                res.clearCookie('refreshToken');
                return res.status(200).json({message: 'OK', statusCode: 200});
            } catch (e) {
                next(e);
            }
        });
};

