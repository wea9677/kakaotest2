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
      },
      userImage : {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};