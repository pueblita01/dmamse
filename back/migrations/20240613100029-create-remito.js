'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Remitos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // idFactura: {
      //   type: Sequelize.INTEGER
      // },
      // nroFactura: {
      //   type: Sequelize.INTEGER
      // },
      // idProducto: {
      //   type: Sequelize.INTEGER
      // },
      // tipo: {
      //   type: Sequelize.CHAR
      // },
      // nroProveedor: {
      //   type: Sequelize.INTEGER
      // },
      // nroCliente: {
      //   type: Sequelize.INTEGER
      // },
      // fecha: {
      //   type: Sequelize.DATE
      // },
      // concepto: {
      //   type: Sequelize.CHAR
      // },
      // importeNeto: {
      //   type: Sequelize.INTEGER
      // },
      // estado: {
      //   type: Sequelize.CHAR
      // },
      // formaDePago: {
      //   type: Sequelize.CHAR
      // },
      // iva: {
      //   type: Sequelize.INTEGER
      // },
      // iibb: {
      //   type: Sequelize.INTEGER
      // },
      // fechaDePago: {
      //   type: Sequelize.DATE
      // },
      // cantidad: {
      //   type: Sequelize.INTEGER
      // },
      // observaciones: {
      //   type: Sequelize.CHAR
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
    await queryInterface.dropTable('Remitos');
  }
};