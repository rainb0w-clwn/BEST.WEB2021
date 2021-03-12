const {randomBytes} = require('crypto');
const argon2 = require('argon2');
const Models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {Logger} = require('../utlis');
const crypto = require('crypto');

module.exports = class AuthService {
    constructor() {
        this.userModel = Models.User;
        this.logger = Logger;
    }

    async SignUp(login, password, ip, user_agent, browser, os, email, lastname, firstname) {
        try {
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
            const refreshToken = await this.generateRefreshToken(user, ip, user_agent, browser, os);

            return {
                ...this.basicDetails(user),
                token,
                refreshToken: refreshToken.token,
            };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }

    }

    async SignIn(login, password, ip, user_agent, browser, os) {
        const userRecord = await this.userModel.findOne({where: {login: login}});
        if (userRecord === null) {
            throw new Error('Login or password is incorrect');
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (!validPassword) {
            throw new Error('Login or password is incorrect');
        }
        let user = userRecord.toJSON();
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        Reflect.deleteProperty(user, 'createdAt');
        Reflect.deleteProperty(user, 'updatedAt');

        const token = this.generateJWT(userRecord);
        const refreshToken = await this.generateRefreshToken(user, ip, user_agent, browser, os);

        return {
            ...this.basicDetails(user),
            token,
            refreshToken: refreshToken.token,
        };
    }

    async refreshToken({token, ipAddress}) {
        const refreshToken = await this.getRefreshToken(token);
        const {user} = refreshToken;

        // replace old refresh token with a new one and save
        const newRefreshToken = this.generateRefreshToken(user, ipAddress);
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await refreshToken.save();
        await newRefreshToken.save();

        // generate new jwt
        const jwtToken = this.generateJWT(user);

        // return basic details and tokens
        return {
            ...this.basicDetails(user),
            jwtToken,
            refreshToken: newRefreshToken.token,
        };
    }

    async revokeToken({token, ipAddress}) {
        const refreshToken = await this.getRefreshToken(token);

        // revoke token and save
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        await refreshToken.save();
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
        const refreshToken = await Models.RefreshToken.findOne({token}).populate('user');
        if (!refreshToken || !refreshToken.isActive) {
            throw 'Invalid token';
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

    async generateRefreshToken(user, ip, user_agent, browser, os) {
        // create a refresh token that expires in 7 days
        return await Models.RefreshToken.create({
            user_id: user.id,
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
        const {id, login, email, roles, lastname, firstname} = user;
        return {id, login, email, roles, lastname, firstname};
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
