'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING
      },
      initialMessage: {
        type: Sequelize.STRING
      },
      customerNumber: {
        type: Sequelize.STRING
      },
      contactId: {
        type: Sequelize.STRING
      },
      participantId: {
        type: Sequelize.STRING
      },
      connectionToken: {
        type: Sequelize.TEXT
      },
      connectionExpiry: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};