'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "updatedAt" on table "FavoriteProducts"
 * changeColumn "createdAt" on table "FavoriteProducts"
 * changeColumn "updatedAt" on table "Products"
 * changeColumn "createdAt" on table "Products"
 * changeColumn "updatedAt" on table "RefreshTokens"
 * changeColumn "createdAt" on table "RefreshTokens"
 * changeColumn "updatedAt" on table "Users"
 * changeColumn "createdAt" on table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "Main",
    "created": "2021-03-14T00:43:53.845Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "FavoriteProducts",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "onUpdate": {
                    "val": "CURRENT_TIMESTAMP"
                },
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "FavoriteProducts",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "onUpdate": {
                    "val": "CURRENT_TIMESTAMP"
                },
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "RefreshTokens",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "onUpdate": {
                    "val": "CURRENT_TIMESTAMP"
                },
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "RefreshTokens",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "onUpdate": {
                    "val": "CURRENT_TIMESTAMP"
                },
                "defaultValue": Sequelize.fn("NOW")
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "defaultValue": Sequelize.fn("NOW")
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
