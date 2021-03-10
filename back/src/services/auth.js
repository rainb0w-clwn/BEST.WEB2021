var {randomBytes} = require('crypto');
var argon2 = require('argon2');
var Models = require('../models');
var jwt = require('jsonwebtoken');
var config = require('../config');
var {Logger} = require('../utlis');


module.exports = class AuthService {
    constructor() {
        this.userModel = Models.UserModel;
        this.logger = Logger;
    }

    async SignUp(login, password) {
        try {
            const salt = randomBytes(32);
            const hashedPassword = await argon2.hash(password, {salt});
            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create({
                login: login,
                password: hashedPassword,
                salt: salt.toString('hex'),
            });
            const token = this.generateToken(userRecord);
            if (!userRecord) {
                throw Error('Error registering new user please try again');
            }
            const user = userRecord.toObject();
            return {user, token};
        } catch (e) {
            this.logger.error(e);
            throw e;
        }

    }

    async SignIn(login, password) {
        const userRecord = await this.userModel.findOne({login: login});
        if (!userRecord) {
            throw new Error('User not registered');
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            this.logger.silly('Password is valid!');
            const token = this.generateToken(userRecord);
            const user = userRecord.toObject();
            return {user, token};
        } else {
            throw new Error('Invalid Password');
        }
    }

    generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                id: user.id, // We are gonna use this in the middleware 'isAuth'
                role: user.role,
                name: user.login,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
            {
                algorithm: config.jwtAlgo,
            },
        );
    }
};
