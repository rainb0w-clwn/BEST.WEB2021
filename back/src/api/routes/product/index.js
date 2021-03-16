const express = require('express');
const router = express.Router();
const {Joi, celebrate} = require("celebrate");
const middlewares = require('../../middlewares');
const {Product} = require('../../../services');

module.exports = (app) => {
    app.use('/product', router);

    router.get('/',
        celebrate({
            query: Joi.object({
                name: Joi.string().required(),
                category: Joi.array().items(Joi.string()),
                store_type: Joi.array().items(Joi.string()),
                rating: Joi.number(),
                priceFrom: Joi.number(),
                priceTo: Joi.number(),
                sortBy: Joi.object().keys({
                    price: Joi.string().valid(...['asc', 'ASC', 'desc', 'DESC']),
                    rating: Joi.string().valid(...['asc', 'ASC', 'desc', 'DESC']),
                }),
                offset: Joi.number().integer(),
                limit: Joi.number().integer(),
            }),
        }),
        async function (req, res, next) {
            try {
                let productInstance = new Product();
                let result = await productInstance.getProducts(req.query);
                return res.status(200).json({data: result});
            } catch (e) {
                next(e);
            }
        });
    router.get('/favorite',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        async function (req, res, next) {
            try {
                let productInstance = new Product();
                let result = await productInstance.getFavorite(req.currentUser.id);
                return res.status(200).json({data: result});
            } catch (e) {
                next(e);
            }
        });
    router.post('/favorite/:productId',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        celebrate({
            params: Joi.object({
                productId: Joi.number().integer().required(),
            }),
        }),
        async function (req, res, next) {
            try {
                let productInstance = new Product();
                let result = await productInstance.setFavorite(req.currentUser.id, req.params.productId);
                let created = result[1];
                let status = 200;
                if (created === true) {
                    status = 201;
                }
                return res.status(status).json({statusCode: status, message: "OK"});
            } catch (e) {
                next(e);
            }

        });

    router.delete('/favorite/:productId',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        celebrate({
            params: Joi.object({
                productId: Joi.number().integer().required(),
            }),
        }),
        async function (req, res, next) {
            try {
                let productInstance = new Product();
                await productInstance.deleteFavorite(req.currentUser.id, req.params.productId);
                return res.status(200).json({statusCode: 200, message: "OK"});
            } catch (e) {
                next(e);
            }
        });

};
