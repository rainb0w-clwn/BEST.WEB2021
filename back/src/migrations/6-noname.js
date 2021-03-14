'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "uuid" to table "RefreshTokens"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2021-03-14T14:35:46.830Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "RefreshTokens",
        "uuid",
        {
            "type": Sequelize.UUID,
            "field": "uuid",
            "allowNull": false,
            "defaultValue": Sequelize.UUIDV4
        }
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
