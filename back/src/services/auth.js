const {randomBytes} = require('crypto');
const argon2 = require('argon2');
const Models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {Logger} = require('../utlis');
const {Op} = require('sequelize');
const crypto = require('crypto');

module.exports = class AuthService {
    constructor() {
        this.userModel = Models.User;
        this.logger = Logger;
    }

    async SignUp(login, password, ip, user_agent, browser, os, email, lastname, firstname) {
        let userExists = await this.userModel.findOne({where: {[Op.or]: {login: login, email: email}}});
        if (userExists != null) {
            let e = Error('User with such Login/email already exists');
            e.name = "UserAlreadyExists";
            throw e;
        }
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(password, {salt});
        this.logger.silly('Creating user db record');
        const userRecord = await this.userModel.create({
            login: login,
            email: email,
            password: hashedPassword,
            salt: salt.toString('hex'),
            lastname: lastname || null,
            firstname: firstname || null,
        });
        if (!userRecord) {
            throw Error('Error registering new user please try again');
        }
        let user = userRecord.toJSON();
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        Reflect.deleteProperty(user, 'createdAt');
        Reflect.deleteProperty(user, 'updatedAt');

        const token = this.generateJWT(userRecord);

        //generate and save refreshToken
        const refreshToken = await this.generateRefreshToken(user.id, ip, user_agent, browser, os);

        return {
            ...this.basicDetails(user),
            token,
            refreshToken: refreshToken.token,
        };

    }

    async SignIn(login, password, ip, user_agent, browser, os) {
        const userRecord = await this.userModel.findOne({where: {login: login}});
        if (userRecord === null) {
            let e = new Error('Login or password is incorrect');
            e.name = 'AuthorizeError';
            throw e;
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (!validPassword) {
            let e = new Error('Login or password is incorrect');
            e.name = 'AuthorizeError';
            throw e;
        }
        let user = userRecord.toJSON();

        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        Reflect.deleteProperty(user, 'createdAt');
        Reflect.deleteProperty(user, 'updatedAt');

        const token = this.generateJWT(userRecord);
        const refreshToken = await this.generateRefreshToken(user.id, ip, user_agent, browser, os);
        return {
            ...this.basicDetails(user),
            token,
            refreshToken: refreshToken.token,
        };
    }

    async refreshToken(tokenInput, ip, user_agent, browser, os) {
        const refreshToken = await this.getRefreshToken(tokenInput);
        let oldToken = refreshToken.toJSON();

        await refreshToken.destroy();
        await this.checkOldToken(oldToken);

        // replace old refresh token with a new one and save
        const newRefreshToken = await this.generateRefreshToken(oldToken.User.id, ip, user_agent, browser, os);
        // generate new jwt
        const newToken = newRefreshToken.token;
        const token = await this.generateJWT(oldToken.User);
        // return basic details and tokens
        return {
            newToken,
            ...this.basicDetails(oldToken.User),
            token,
        };
    }

    async checkOldToken(oldToken) {
        if (oldToken.expiredAt <= Date.now()) {
            throw Error('Refresh Token has been expired!');
        }
    }

    async revokeToken(tokenInput) {
        const refreshToken = await this.getRefreshToken(tokenInput);
        await refreshToken.destroy();
    }

    async getAll() {
        const users = await Models.User.findAll();
        return users.map(x => this.basicDetails(x));
    }

    async getById(id) {
        const user = await this.getUser(id);
        return this.basicDetails(user);
    }

    async getRefreshToken(token) {
        // console.log(Models.RefreshToken.has)
        const refreshToken = await Models.RefreshToken.findOne({where: {token: token}, include: [Models.User]});
        if (!refreshToken) {
            let e = new Error('Неверные данные токена');
            e.name = 'Unauthorized';
            throw e;
        }
        return refreshToken;
    }

    async getRefreshTokens(userId) {
        // check that user exists
        // if (check) {
        //     await this.getUser(userId);
        // }

        // return refresh tokens for user
        return Models.RefreshToken.findAll({where: {user_id: userId}});
    }

    async getUser(id) {
        const user = await Models.User.findByPk(id);
        if (!user) {
            throw 'User not found';
        }
        return user;
    }

    generateJWT(user) {
        return jwt.sign(
            {
                id: user.id, // We are gonna use this in the middleware 'isAuth'
                roles: user.roles,
                login: user.login,
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
            },
            config.jwtSecret,
            {
                expiresIn: config.jwtExp,
                algorithm: config.jwtAlgo,
            },
        );
    }

    async generateRefreshToken(user_id, ip, user_agent, browser, os) {
        // create a refresh token that expires in 7 days
        return await Models.RefreshToken.create({
            user_id: user_id,
            ip: ip,
            os: os,
            browser: browser,
            user_agent: user_agent,
            token: this.randomTokenString(),
            expiredAt: new Date(Date.now() + config.accessTokenExp),
        });
    }

    randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    }

    basicDetails(user) {
        const {login, email, lastname, firstname} = user;
        return {login, email, lastname, firstname};
    }

    setTokenCookie(res, token) {
        // create http only cookie with refresh token that expires in 7 days
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + config.accessTokenExp),
        };
        res.cookie('refreshToken', token, cookieOptions);
    }
};
