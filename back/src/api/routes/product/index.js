const express = require('express');
const router = express.Router();
const {Joi, celebrate} = require("celebrate");
const middlewares = require('../../middlewares');
const {Logger} = require('../../../utlis');
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
            }),
        }),
        async function (req, res) {
            try {
                let productInstance = new Product();
                let result = await productInstance.getProducts(req.query);
                return res.status(200).send(result);
            } catch (e) {
                Logger.error('error: %o', e);
                res.status(500);
            }

        });
    router.get('/favorite',
       // 
        async function (req, res) {
            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('error: %o', e);
                res.status(500);
            }
        });
    router.post('/favorite/:id',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        async function (req, res) {
            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('error: %o', e);
                res.status(500);
            }
        });

    router.delete('/favorite/:id',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        async function (req, res) {
            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('error: %o', e);
                res.status(500);
            }
        });

};
