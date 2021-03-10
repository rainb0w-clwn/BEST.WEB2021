var express = require('express');
var middlewares = require('../../middlewares');
const router = express.Router();

module.exports = (app) => {
    app.use('/user', router);

    router.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
        return res.json({user: req.currentUser}).status(200);
    });
};
