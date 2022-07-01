'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      userId : {
        type: DataTypes.STRING(150),
        allowNull:false,
        primaryKey: true,
      },
      nickname : {
        type: DataTypes.STRING(150),
        allowNull: false,
      }

    }
  )
  
  
  
};