const dotenv = require('dotenv');
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

var normalizePort = require('normalize-port');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
    port: normalizePort(process.env.PORT),

    mongoURL: process.env.MONGODB_URI,

    jwtSecret: process.env.JWT_SECRET,
    jwtAlgo: process.env.JWT_ALGO,

    api: {
        prefix: '/api',
    },

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};
