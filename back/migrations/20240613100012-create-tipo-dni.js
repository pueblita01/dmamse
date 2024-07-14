'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TiposDni', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoDNI: {
        allowNull: true,
        type: Sequelize.CHAR
      },
      nroDNI: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TiposDni');
  }
};