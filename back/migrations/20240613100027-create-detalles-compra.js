'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetallesCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detalleCprId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Compras", key: "id", constraints: false, },
      },
      productoCprId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Productos", key: "id", constraints: false, },
      },
      cantidadCpr: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      precioUnitario: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      descuentoCpr: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      precioTotalDetalle: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
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
    await queryInterface.dropTable('DetallesCompras');
  }
};