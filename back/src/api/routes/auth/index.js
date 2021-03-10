var express = require('express');
const {Joi, celebrate} = require("celebrate");
var {AuthService} = require("../../../services");
var middlewares = require('../../middlewares');
const router = express.Router();
var {Logger} = require('../../../utlis');


module.exports = (app) => {
    app.use('/auth', router);

    /**
     * @swagger
     * /auth/signup:
     *   get:
     *     summary: регистрация
     *     description: по введенным логину-паролю с проверкой на уникальность логина создается пользователь.
     *     operationId: signUp
     *   parameters:
     *      - in: login
     *      name: login
     *      description: Логин
     *      schema:
     *          type: string
     *          example: test@test.ru
     *      - in: password
     *      name: password
     *      description: Пароль
     *      schema:
     *          type: string
     *          example: 12345678
     *   requestBody:
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  properties:
     *                      token:
     *                      type: string
     *                      example: "51872eca5efedcf424db4cf5afd16a9d00ad25b743a034c9c221afc85d18dcd5e4ad6e3f08607550"
     */
    router.post('/signup',
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

    router.post('/signin',
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

