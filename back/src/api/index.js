var express = require('express');
var user = require('./routes/user');
var auth = require('./routes/auth');

module.exports = () => {
    const app = express.Router();
    auth(app);
    user(app);
    return app;
};
