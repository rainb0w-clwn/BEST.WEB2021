'use strict';
const CSVToJSON = require('csvtojson');


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('TRUNCATE "Products" CASCADE');
    let data1 = await CSVToJSON().fromFile(__dirname + '/beru.csv');
    await queryInterface.bulkInsert('Products', data1);
    let data2 = await CSVToJSON().fromFile(__dirname + '/hm.csv');
    await queryInterface.bulkInsert('Products', data2);
    let data3 = await CSVToJSON().fromFile(__dirname + '/asos.csv');
    await queryInterface.bulkInsert('Products', data3);
    let data4 = await CSVToJSON().fromFile(__dirname + '/dns.csv');
    await queryInterface.bulkInsert('Products', data4);
    let data5 = await CSVToJSON().fromFile(__dirname + '/goods.csv');
    await queryInterface.bulkInsert('Products', data5);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.sequelize.query('TRUNCATE "Products" CASCADE');
  },
};
