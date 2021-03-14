'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Products", deps: []
 * createTable "Users", deps: []
 * createTable "FavoriteProducts", deps: [Products, Users]
 * createTable "RefreshTokens", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "Main",
    "created": "2021-03-14T00:39:21.585Z",
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
                    "type": Sequelize.BIGINT,
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
                    "onUpdate": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "defaultValue": Sequelize.NOW
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "login": {
                    "type": Sequelize.STRING,
                    "field": "login",
                    "unique": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "salt": {
                    "type": Sequelize.STRING,
                    "field": "salt",
                    "allowNull": false
                },
                "lastname": {
                    "type": Sequelize.STRING,
                    "field": "lastname"
                },
                "firstname": {
                    "type": Sequelize.STRING,
                    "field": "firstname"
                },
                "roles": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "roles",
                    "defaultValue": Sequelize.ARRAY
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "defaultValue": Sequelize.NOW
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "onUpdate": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "defaultValue": Sequelize.NOW
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "FavoriteProducts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "name": "product_id",
                    "field": "product_id",
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "name": "user_id",
                    "field": "user_id",
                    "allowNull": false
                },
                "blocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "blocked",
                    "defaultValue": false,
                    "allowNull": null
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "defaultValue": Sequelize.NOW
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "onUpdate": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "defaultValue": Sequelize.NOW
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "RefreshTokens",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "name": "user_id",
                    "field": "user_id",
                    "allowNull": false
                },
                "ip": {
                    "type": Sequelize.CIDR,
                    "field": "ip"
                },
                "os": {
                    "type": Sequelize.TEXT,
                    "field": "os"
                },
                "browser": {
                    "type": Sequelize.TEXT,
                    "field": "browser"
                },
                "user_agent": {
                    "type": Sequelize.TEXT,
                    "field": "user_agent"
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "allowNull": false
                },
                "expiredAt": {
                    "type": Sequelize.DATE,
                    "field": "expiredAt",
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
                    "onUpdate": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "defaultValue": Sequelize.NOW
                }
            },
            {}
        ]
    }
];

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
