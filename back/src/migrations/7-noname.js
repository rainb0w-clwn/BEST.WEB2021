'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "uuid" from table "RefreshTokens"
 *
 **/

var info = {
    "revision": 7,
    "name": "noname",
    "created": "2021-03-14T14:40:28.773Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["RefreshTokens", "uuid"]
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
