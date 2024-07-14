'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetallesVentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detalleVtaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Ventas", key: "id", constraints: false, },
      },
      productoVtaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Productos", key: "id", constraints: false, },
      },
      cantidad: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      precioUnitario: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      descuentoVta: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      precioTotalDetalleVta: {
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
    await queryInterface.dropTable('DetallesVentas');
  }
};