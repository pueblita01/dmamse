'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permisos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permisoOperacion: {
        allowNull: true,
        type: Sequelize.CHAR
      }
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permisos');
  }
};