'use strict';
const {Model} = require('sequelize');
var currency = require('../_helper/product_currency');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        store_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: currency.RUR,
        },
        rating: {
            type: DataTypes.FLOAT,
        },
        rating_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url_picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
