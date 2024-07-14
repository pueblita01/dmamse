'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      altura: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      codigoPostal: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      manzana: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      departamento: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      ciudad: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      provincia: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      pais: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Direcciones');
  }
};