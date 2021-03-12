'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Products", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "Product",
    "created": "2021-03-12T21:55:34.440Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Products",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "store_type": {
                "type": Sequelize.STRING,
                "field": "store_type",
                "allowNull": false
            },
            "code": {
                "type": Sequelize.INTEGER,
                "field": "code"
            },
            "category": {
                "type": Sequelize.STRING,
                "field": "category",
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": false
            },
            "price": {
                "type": Sequelize.FLOAT,
                "field": "price",
                "allowNull": false
            },
            "currency": {
                "type": Sequelize.STRING,
                "field": "currency",
                "defaultValue": "RUR",
                "allowNull": false
            },
            "rating": {
                "type": Sequelize.FLOAT,
                "field": "rating"
            },
            "rating_count": {
                "type": Sequelize.INTEGER,
                "field": "rating_count",
                "defaultValue": 0
            },
            "url": {
                "type": Sequelize.STRING,
                "field": "url",
                "allowNull": false
            },
            "url_picture": {
                "type": Sequelize.STRING,
                "field": "url_picture",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.NOW
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
