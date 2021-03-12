var express = require('express');
const {Joi, celebrate} = require("celebrate");
var {AuthService} = require("../../../services");
var middlewares = require('../../middlewares');
const router = express.Router();
var {Logger} = require('../../../utlis');
var config = require('../../../config');

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

        async function (req, res, next) {
            const {login, password} = req.body;
            const {ip} = req.clientIp || null;
            const {source, browser, os} = req.useragent;
            try {
                const authServiceInstance = new AuthService();
                const userData = await authServiceInstance.SignIn(login, password, ip, source, browser, os);
                setTokenCookie(res, userData.refreshToken);
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
                setTokenCookie(res, refreshToken);
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

    function setTokenCookie(res, token) {
        // create http only cookie with refresh token that expires in 7 days
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + config.accessTokenExp),
        };
        res.cookie('refreshToken', token, cookieOptions);
    }
};

