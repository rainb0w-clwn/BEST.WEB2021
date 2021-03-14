const express = require('express');
const middlewares = require('../../middlewares');
const router = express.Router();
const Role = require('../../../_helper/role');
const {Joi, celebrate} = require("celebrate");
const {AuthService} = require("../../../services");

module.exports = (app) => {
    app.use('/user', router);

    router.get('/me', middlewares.isAuth(), middlewares.attachCurrentUser, (req, res) => {
        return res.json({user: req.currentUser}).status(200);
    });

    // router.post('/revoke-token', middlewares.isAuth(),
    //     celebrate({
    //         cookies: Joi.object({
    //             refreshToken: Joi.string().length(80).required(),
    //         }),
    //     }),
    //     async function (req, res, next) {
    //         // accept token from request body or cookie
    //         const token = req.cookies.refreshToken;
    //
    //         // users can revoke their own tokens and admins can revoke any tokens
    //         if (!req.token && req.user.role !== Role.Admin) {
    //             return res.status(401).json({message: 'Unauthorized'});
    //         }
    //         const authServiceInstance = new AuthService();
    //         authServiceInstance.revokeToken({token, ipAddress})
    //             .then(() => res.json({message: 'Token revoked'}))
    //             .catch(next);
    //     });

    router.get('/',
        middlewares.isAuth(Role.Admin),
        async function (req, res, next) {
            const authServiceInstance = new AuthService();
            authServiceInstance.getAll()
                .then(users => res.json(users))
                .catch(next);
        },
    );

    router.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required(),
            }),
        }),
        middlewares.isAuth(Role.Admin),
        async function (req, res, next) {
            const authServiceInstance = new AuthService();
            authServiceInstance.getById(req.params.id)
                .then(user => user ? res.json(user) : res.sendStatus(404))
                .catch(next);
        },
    );

};
