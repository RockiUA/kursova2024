'use strict';
const truncate = require('./helpers/truncate');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await truncate(queryInterface, 'roles');

    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'admin',
          description: 'Administrator.',
        },
        {
          name: 'user',
          description: 'Site user.',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await truncate(queryInterface, 'roles');
  },
};
