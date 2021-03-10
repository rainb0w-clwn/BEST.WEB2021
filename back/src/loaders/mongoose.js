let mongoose = require('mongoose');
let config = require('../config');

module.exports = async () => {
    const connection = await mongoose.connect(config.mongoURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    return connection.connection.db;
};
