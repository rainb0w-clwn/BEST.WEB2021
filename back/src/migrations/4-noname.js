'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "store_type" on table "Products"
 * changeColumn "category" on table "Products"
 * changeColumn "name" on table "Products"
 * changeColumn "url" on table "Products"
 * changeColumn "url_picture" on table "Products"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2021-03-14T03:15:37.879Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Products",
            "store_type",
            {
                "type": Sequelize.TEXT,
                "field": "store_type",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "category",
            {
                "type": Sequelize.TEXT,
                "field": "category",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "name",
            {
                "type": Sequelize.TEXT,
                "field": "name",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "url",
            {
                "type": Sequelize.TEXT,
                "field": "url",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Products",
            "url_picture",
            {
                "type": Sequelize.TEXT,
                "field": "url_picture",
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
