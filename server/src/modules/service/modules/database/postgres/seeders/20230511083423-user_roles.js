'use strict';
const truncate = require('./helpers/truncate'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await truncate(queryInterface, 'user_roles');

    await queryInterface.bulkInsert(
      'user_roles',
      [
        {
          roleId: 2,
          userId: 1,
        },
        {
          roleId: 1,
          userId: 1,
        },
        {
          roleId: 2,
          userId: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await truncate(queryInterface, 'user_roles');
  },
};
