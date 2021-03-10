var express = require('express');
const {Joi, celebrate} = require("celebrate");
var {AuthService} = require("../../../services");
var middlewares = require('../../middlewares');
const router = express.Router();
var {Logger} = require('../../../utlis');


module.exports = (app) => {
    app.use('/auth', router);

    router.post('/register',
        celebrate({
            body: Joi.object({
                login: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async function (req, res, next) {
            const {login, password} = req.body;
            try {
                const authServiceInstance = new AuthService();
                const userData = await authServiceInstance.SignUp(login, password);
                return res.status(201).json(userData);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    router.post('/auth',
        celebrate({
            body: Joi.object({
                login: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async function (req, res, next) {
            const {login, password} = req.body;
            try {
                const authServiceInstance = new AuthService();
                const userData = await authServiceInstance.SignIn(login, password);
                return res.status(201).json(userData);
            } catch (e) {
                Logger.error('🔥 error: %o',  e );
                return next(e);
            }
        });
    router.post('/logout',
        middlewares.isAuth,
        async function (req, res, next) {
            try {
                //@TODO AuthService.Logout(req.user) do some clever stuff
                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o',  e );
                return next(e);
            }
        });
};

