'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
     
      nickname: {
        type: Sequelize.STRING
      }
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};