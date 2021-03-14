const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    RefreshToken.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ip: {
            type: DataTypes.CIDR,
        },
        os: {
            type: DataTypes.TEXT,
        },
        browser: {
            type: DataTypes.TEXT,
        },
        user_agent: {
            type: DataTypes.TEXT,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
            onUpdate : sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'RefreshToken',
    });
    return RefreshToken;
};
