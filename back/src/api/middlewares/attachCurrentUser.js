const Models = require('../../models');
const {Logger} = require('../../utlis');

const attachCurrentUser = async (req, res, next) => {
    try {
        const UserModel = Models.User;
        const userRecord = await UserModel.findByPk(req.token.id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        let user = userRecord.toJSON();
        console.log(user);
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        Reflect.deleteProperty(user, 'createdAt');
        Reflect.deleteProperty(user, 'updatedAt');
        req.currentUser = user;
        return next();
    } catch (e) {
        Logger.error('Error attaching user to req: %o', e);
        return next(e);
    }
};

module.exports = attachCurrentUser;
