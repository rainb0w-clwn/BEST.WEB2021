var config = require('../../config');
var jwt = require('express-jwt');

function getTokenFromHeader(req) {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = jwt({
    secret: config.jwtSecret,
    algorithms: [config.jwtAlgo],
    userProperty: 'token',
    getToken: getTokenFromHeader,
});
