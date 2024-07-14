'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // productoId: {
      //   type: Sequelize.INTEGER
      // },
      // categoriaId: {
      //   type: Sequelize.INTEGER
      // },
      // compras: {
      //   type: Sequelize.INTEGER
      // },
      // ventas: {
      //   type: Sequelize.INTEGER
      // },
      // stock: {
      //   type: Sequelize.INTEGER
      // },
      // precioVenta: {
      //   type: Sequelize.INTEGER
      // },
      // presentacion: {
      //   type: Sequelize.CHAR
      // },
      // utilidadPorProducto: {
      //   type: Sequelize.INTEGER
      // },
      // valorInventario: {
      //   type: Sequelize.INTEGER
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Inventarios');
  }
};