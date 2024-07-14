'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RazonesSociales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      razonSocial: {
        allowNull: true,
        type: Sequelize.CHAR
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RazonesSociales');
  }
};