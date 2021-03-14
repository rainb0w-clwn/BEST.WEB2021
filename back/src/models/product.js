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
            this.hasMany(models.FavoriteProduct, {
                foreignKey: {
                    name: 'product_id',
                },
            });
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        store_type: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        code: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url_picture: {
            type: DataTypes.TEXT,
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
        modelName: 'Product',
    });
    return Product;
};
