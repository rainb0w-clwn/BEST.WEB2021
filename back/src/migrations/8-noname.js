'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "product_id" on table "FavoriteProducts"
 * changeColumn "user_id" on table "FavoriteProducts"
 * changeColumn "user_id" on table "RefreshTokens"
 *
 **/

var info = {
    "revision": 8,
    "name": "noname",
    "created": "2021-03-14T15:25:45.086Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "FavoriteProducts",
            "product_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Products",
                    "key": "id"
                },
                "name": "product_id",
                "field": "product_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "FavoriteProducts",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "name": "user_id",
                "field": "user_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "RefreshTokens",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "name": "user_id",
                "field": "user_id",
                "allowNull": false
            }
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
