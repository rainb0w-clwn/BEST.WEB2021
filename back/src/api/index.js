const express = require('express');
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const test = require('./routes/test');

const app = express.Router();

app.get('/health', (req, res) => {
    res.status(200).json({message: "OK"});
});

module.exports = () => {
    auth(app);
    user(app);
    product(app);
    test(app);
    return app;
};
