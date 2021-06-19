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
      customerInitialMessage: {
        type: Sequelize.STRING
      },
      customerNumber: {
        type: Sequelize.STRING
      },
      customerIdentifier: {
        type: Sequelize.STRING
      },
      awsContactId: {
        type: Sequelize.STRING
      },
      awsParticipantId: {
        type: Sequelize.STRING
      },
      awsConnectionToken: {
        type: Sequelize.STRING
      },
      awsConnectionExpiry: {
        type: Sequelize.STRING
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