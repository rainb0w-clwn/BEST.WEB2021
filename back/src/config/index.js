const dotenv = require('dotenv');
const {resolve} = require('path');
const envFound = dotenv.config({path: resolve(__dirname, "../../../.env")});
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

var normalizePort = require('normalize-port');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let dbURI = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`;
module.exports = {
    port: normalizePort(process.env.SERVER_PORT),

    mongoURL: process.env.MONGODB_URI,
    dbURI: dbURI,
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DB,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "postgres",
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DB,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "postgres",
        "logging": false,
    },

    jwtSecret: process.env.JWT_SECRET,
    jwtAlgo: process.env.JWT_ALGO,
    jwtExp: process.env.JWT_EXP,
    accessTokenExp: parseInt(process.env.ACCESS_TOKEN_EXP, 10),

    api: {
        prefix: '/api',
    },

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};
