var config = require('../../config');
var jwt = require('express-jwt');
var {AuthService} = require('../../services');

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
        // authenticate JWT token and attach user to request object (req.user)
        jwt({
            secret: config.jwtSecret,
            algorithms: [config.jwtAlgo],
            userProperty: 'token',
            getToken: getTokenFromHeader,
        }),
        async (req, res, next) => {
            const authServiceInstance = new AuthService();
            const user = await authServiceInstance.getUser(req.token.id || null);
            if (!user || (roles.length && user.roles.filter(x => roles.includes(x)).length === 0)) {
                // user no longer exists or role not authorized
                return res.status(401).json({message: 'Unauthorized'});
            }

            // authentication and authorization successful
            const refreshTokens = await authServiceInstance.getRefreshTokens(user.id);
            req.tokenOwns = token => !!refreshTokens.find(x => x.token === token);
            next();
        },
    ];
}

module.exports = authorize;
