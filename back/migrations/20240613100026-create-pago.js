'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoPagoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "TiposPagos", key: "id", constraints: false, },
      },
      pagoVtaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Ventas", key: "id", constraints: false, },
      },
      pagoCprId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Compras", key: "id", constraints: false, },
      },
      montoPago: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      cuotasCant: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      fechaPago: {
        allowNull: true,
        type: Sequelize.DATE
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pagos');
  }
};