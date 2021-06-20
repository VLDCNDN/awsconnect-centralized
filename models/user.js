'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    customerName: DataTypes.STRING,
    customerInitialMessage: DataTypes.STRING,
    customerNumber: DataTypes.STRING,
    customerIdentifier: DataTypes.STRING,
    awsContactId: DataTypes.STRING,
    awsParticipantId: DataTypes.STRING,
    awsConnectionToken: DataTypes.STRING,
    awsConnectionExpiry: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};