var express = require('express');
const router = express.Router();
const {Joi, celebrate} = require("celebrate");
var middlewares = require('../../middlewares');
var {Logger} = require('../../../utlis');
var config = require('../../../config');

module.exports = (app) => {
    app.use('/product', router);

    router.get('/',
        async function (req, res, next) {
            try { //YAUUUUU pometka

                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }

        });
    router.get('/favorite/',
       // 
        async function (req, res, next) {

            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });
    router.post('/favorite/:id',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        async function (req, res) {
           
            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o', e);
            }
        });

    router.delete('/favorite/:id',
        middlewares.isAuth(),
        middlewares.attachCurrentUser,
        async function (req, res) {

            try { //YAUUUUU pometka
                return res.status(200).end();
            } catch (e) {
                Logger.error('🔥 error: %o', e);
            }
        });

};
