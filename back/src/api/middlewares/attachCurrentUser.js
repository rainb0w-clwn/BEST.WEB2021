var Models = require('../../models');
var {Logger} = require('../../utlis');

const attachCurrentUser = async (req, res, next) => {
    try {
        const UserModel = Models.UserModel;
        const userRecord = await UserModel.findById(req.token.id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        req.currentUser = userRecord.toObject();
        return next();
    } catch (e) {
        Logger.error('Error attaching user to req: %o', e);
        return next(e);
    }
};

module.exports = attachCurrentUser;
