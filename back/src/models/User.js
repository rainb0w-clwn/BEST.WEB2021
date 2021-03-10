var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const User = new mongoose.Schema(
    {
        login: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            index: true,
        },
        password: {type: String, required: true},
        salt: {type: String, required: true},
        role: {type: String, default: 'user'},
    },
    {timestamps: true},
);
User.plugin(uniqueValidator);

User.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.salt;
        delete ret.password;
    },
});
User.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.salt;
        delete ret.password;
    },
});
module.exports = mongoose.model('User', User);

