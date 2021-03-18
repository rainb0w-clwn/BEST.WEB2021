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
        let countQuery = this.getCountQuery(params);
        let count = await Models.Product.count(countQuery);
        let categories = {};
        let store_type = {};
        let pageCount = 0;
        let totalPage = 1;
        let {needCategories, limit, page} = params;
        needCategories = needCategories != null ? needCategories : 0
        if (count !== 0 && needCategories > 0) {
            limit = limit != null && limit <= 72 ? limit : 72;
            pageCount = Math.ceil(count/limit);
            countQuery.attributes = [];
            let categoriesCountQuery = countQuery;
            categoriesCountQuery.attributes.push('category');
            categoriesCountQuery.group = 'category';
            categoriesCountQuery.order = [];
            categories = await Models.Product.count(categoriesCountQuery);
            countQuery.attributes = [];
            countQuery.attributes.push('store_type');
            countQuery.group = 'store_type';
            store_type = await Models.Product.count(countQuery);
        }
        totalPage = page != null && page > 0 ? page : totalPage;
        let quary = this.getQuery(params);
        let data = await Models.Product.findAll(quary);

        return {page: totalPage, pageCount: pageCount, categories: categories, store_types: store_type, data: data};
    }

    async getFavorite(userId) {
        let favorite = await Models.FavoriteProduct.findAll({where: {user_id: userId, blocked: false}});
        return favorite;
    }

    async setFavorite(userId, productId) {
        let favorite = await Models.FavoriteProduct.findOrCreate({where: {user_id: userId, product_id: productId, blocked: false}});
        return favorite;

    }

    async deleteFavorite(userId, productId) {
        let result = await Models.FavoriteProduct.update({blocked: true}, {
            where: {
                user_id: userId,
                product_id: productId,
                blocked: false,
            },
        });
        return result;
    }

    getQuery(params) {
        let {name, category, store_type, rating, priceFrom, priceTo, sortBy, page, limit} = params;
        let data = {
            order: [],
        };
        // console.log(params);
        let sortByAllow = ['price', 'rating'];
        let whereCondition = {};
        if (name != null) {
            name = name.trim();
            whereCondition[Op.or] = [{name: {[Op.iLike]: '%'+name+'%'}}, {category: {[Op.iLike]: '%'+name+'%'}}];
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
        data.limit = limit != null && limit <= 72 ? limit : 72;
        page = page != null && page > 0 ? page : 1;
        data.offset = (page - 1) * data.limit;
        data.order.push('id');
        whereCondition != null ? data.where = whereCondition : null;
        return data;
    }





    getCountQuery(params) {
            let {name, category, store_type, rating, priceFrom, priceTo} = params;
            let data = {
                order: [],
            };

            // console.log(params);
            let whereCondition = {};
            if (name != null) {
                name = name.trim();
                whereCondition[Op.or] = [{name: {[Op.iLike]: '%'+name+'%'}}, {category: {[Op.iLike]: '%'+name+'%'}}];
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

            whereCondition != null ? data.where = whereCondition : null;
            return data;
    }
};
