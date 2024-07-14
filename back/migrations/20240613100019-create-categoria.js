'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marca: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      categoria: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      codigoCategoria:{
        type: Sequelize.CHAR,
        allowNull: true,
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categorias');
  }
};