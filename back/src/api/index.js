var express = require('express');
var user = require('./routes/user');
var auth = require('./routes/auth');
var test = require('./routes/test');
module.exports = () => {
    const app = express.Router();
    auth(app);
    user(app);
    test(app);
    return app;
};
