'use strict';

const { BOOLEAN } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroFactura: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      facturaCajaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Facturas", key: "id", constraints: false, },
      },
      tipo: {
        allowNull: true,
        type: Sequelize.CHAR,
      },
      nroProveedor: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      nroCliente: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      concepto: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      importeNeto: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      estado: {
        allowNull: true,
        type: Sequelize.CHAR,
      },
      formaDePago: {
        allowNull: true,
        type: Sequelize.CHAR,
      },
      iva: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      iibb: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      fechaDePago: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      cantidad: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      observaciones: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      anulado: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
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
    await queryInterface.dropTable('Facturas');
  }
};