'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
    await queryInterface.createTable('users', { 
      id: Sequelize.INTEGER ,
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING
    
    });
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('users');
     
  }
};
