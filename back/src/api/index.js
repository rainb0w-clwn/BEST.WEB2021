var express = require('express');
var user = require('./routes/user');
var auth = require('./routes/auth');
var product = require('./routes/product');
var test = require('./routes/test');
module.exports = () => {
    const app = express.Router();
    auth(app);
    user(app);
    product(app);
    test(app);
    return app;
};
