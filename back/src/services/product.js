var Models = require('../models');
// var config = require('../config');
var {Logger} = require('../utlis');
const {Op} = require("sequelize");

module.exports = class ProductService {
    constructor() {
        this.userModel = Models.Product;
        this.logger = Logger;
    }

    async getProducts(params) {
        let query = this.getQuery(params);
        return await Models.Product.findAll(query);
    }

    getQuery(params) {
        let {name, category, store_type, rating, priceFrom, priceTo, sortBy, offset} = params;
        let data = {
            order: [],
        };
        console.log(params);
        let sortByAllow = ['price', 'rating'];
        let whereCondition = {};
        if (name != null) {
            whereCondition[Op.or] = [{name: {[Op.iLike]: name}}, {category: {[Op.iLike]: name}}];
            let escapedName = Models.sequelize.escape(`%${name}%`);
            data.order.push(Models.sequelize.literal(`name ILIKE ${escapedName} OR NULL`));
            data.order.push(Models.sequelize.literal(`category ILIKE ${escapedName} OR NULL`));
        }
        category != null ? whereCondition.category = category : null;
        store_type != null ? whereCondition.store_type = store_type : null;
        rating != null ? whereCondition.rating = {[Op.and]: {[Op.lte]: rating, [Op.gt]: rating - 1}} : null;
        if (priceFrom != null) {
            if (!('price' in whereCondition)) {
                whereCondition.price = {};
            }
            whereCondition.price[Op.gte] = priceFrom;
        }
        if (priceTo != null) {
            if (!('price' in whereCondition)) {
                whereCondition.price = {};
            }
            whereCondition.price[Op.lte] = priceTo;
        }
        // priceTo != null ? whereCondition.price[Op.and][Op.lte] = priceTo : null;
        if (sortBy != null) {
            Object.keys(sortBy).forEach((key) => {
                sortByAllow.includes(key) && ['asc', 'ASC', 'desc', 'DESC'].includes(sortBy[key]) ?
                    data.order.push([key, sortBy[key]]) : null;
            });
        }
        offset != null ? data.offset = offset : null;

        whereCondition != null ? data.where = whereCondition : null;
        return data;
    }


};
