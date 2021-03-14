const config = require('../../config');
const jwt = require('express-jwt');
const {AuthService} = require('../../services');

function getTokenFromHeader(req) {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // authenticate JWT token
            jwt({
                secret: config.jwtSecret,
                algorithms: [config.jwtAlgo],
                userProperty: 'token',
                getToken: getTokenFromHeader,
            }),
        async (req, res, next) => {
            console.log(req.token);

            //authorization
            if (roles.length && req.token.roles.filter(x => roles.includes(x)).length === 0) {
                // role not authorized
                res.status(403).json({
                    statusCode: 403,
                    error: "Forbidden",
                    message: 'У Вас нет прав на выполнение этой операции',
                });
                return;
            }

            // authentication and authorization successful
            const authServiceInstance = new AuthService();
            const refreshTokens = await authServiceInstance.getRefreshTokens(req.token.id);
            req.tokenOwns = token => !!refreshTokens.find(x => x.token === token);
            next();
        },
    ];
}

module.exports = authorize;
