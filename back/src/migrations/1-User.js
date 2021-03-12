'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "RefreshTokens", deps: [Users, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "User",
    "created": "2021-03-11T23:15:17.799Z",
    "comment": "",
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                },
                "login": {
                    "type": Sequelize.STRING,
                    "field": "login",
                    "unique": true,
                    "allowNull": false,
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true,
                    },
                    "unique": true,
                    "allowNull": false,
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false,
                },
                "salt": {
                    "type": Sequelize.STRING,
                    "field": "salt",
                    "allowNull": false,
                },
                "lastname": {
                    "type": Sequelize.STRING,
                    "field": "lastname",
                },
                "firstname": {
                    "type": Sequelize.STRING,
                    "field": "firstname",
                },
                "roles": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "roles",
                    "defaultValue": Sequelize.Array,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "defaultValue": Sequelize.NOW,
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.NOW,
                },
            },
            {},
        ],
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
                    "primaryKey": true,
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id",
                    },
                    "name": "user_id",
                    "field": "user_id",
                    "allowNull": false,
                },
                "ip": {
                    "type": Sequelize.CIDR,
                    "field": "ip",
                },
                "os": {
                    "type": Sequelize.TEXT,
                    "field": "os",
                },
                "browser": {
                    "type": Sequelize.TEXT,
                    "field": "browser",
                },
                "user_agent": {
                    "type": Sequelize.TEXT,
                    "field": "user_agent",
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "allowNull": false,
                },
                "expiredAt": {
                    "type": Sequelize.DATE,
                    "field": "expiredAt",
                    "allowNull": false,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "defaultValue": Sequelize.NOW,
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.NOW,
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id",
                    },
                    "allowNull": true,
                },
            },
            {},
        ],
    },
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                } else {
resolve();
}
            }
            next();
        });
    },
    info: info,
};
