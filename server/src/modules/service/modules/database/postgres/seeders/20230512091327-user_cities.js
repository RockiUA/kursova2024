'use strict';
const truncate = require('./helpers/truncate');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await truncate(queryInterface, 'user_cities');

    await queryInterface.bulkInsert(
      'user_cities',
      [
        {
          userId: 2,
          cityId: 1,
        },
        {
          userId: 2,
          cityId: 2,
        },
        {
          userId: 2,
          cityId: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await truncate(queryInterface, 'user_cities');
  },
};
