'use strict';
const truncate = require('./helpers/truncate');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await truncate(queryInterface, 'users');

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@test.com',
          password: '$2b$10$X/ErSuyzfBu2/.PkQbWhRe5MqmLLWeTnYvF6qMYBiF6.M/RAFyVYC', // "some_password"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test1@test.com',
          password: '$2b$10$rodBEwkmZCaJSZz2nsMrkupwixyIfqRGYmVq9lagArz5s3y8gyn7a', // "some_password"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await truncate(queryInterface, 'users');
  },
};
