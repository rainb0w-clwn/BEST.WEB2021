const express = require('express');
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const test = require('./routes/test');
module.exports = () => {
    const app = express.Router();
    auth(app);
    user(app);
    product(app);
    test(app);
    return app;
};
