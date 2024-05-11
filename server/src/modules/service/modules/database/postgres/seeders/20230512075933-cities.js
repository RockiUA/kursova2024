'use strict';
const citiesList = require('./json/cities.list.json');
const truncate = require('./helpers/truncate');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await truncate(queryInterface, 'cities');

    const seedData = citiesList.map((item) => ({
      name: item.name,
      country: item.country,
      longitude: item.coord.lon.toFixed(4),
      latitude: item.coord.lat.toFixed(4),
    }));

    await queryInterface.bulkInsert('cities', seedData, {});
  },

  async down(queryInterface) {
    await truncate(queryInterface, 'cities');
  },
};
