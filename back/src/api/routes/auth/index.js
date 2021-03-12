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
                return res.status(201).json(userData);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
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
                return res.status(200).json(userData);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    router.post('/refresh-token', async function (req, res, next) {
        const token = req.cookies.refreshToken;
        const ipAddress = req.ip;
        const authServiceInstance = new AuthService();
        authServiceInstance.refreshToken({token, ipAddress})
            .then(({refreshToken, ...user}) => {
                authServiceInstance.setTokenCookie(res, refreshToken);
                res.json(user);
            })
            .catch(next);
    });

    router.post('/logout',
        middlewares.isAuth,
        async function (req, res, next) {
            try {
                //@TODO AuthService.Logout(req.user) do some clever stuff
                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });
};

