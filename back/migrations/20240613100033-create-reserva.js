'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteReservaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Clientes", key: "id", constraints: false, },
      },
      proveedorReservaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Proveedores", key: "id", constraints: false, },
      },
      fechaResvInicio: {
        allowNull: true,
        type: Sequelize.DATE
      },
      fechaReservaFin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      descripcionReserv: {
        allowNull: true,
        type: Sequelize.STRING
      },
      estado: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      modo: {
        allowNull: true,
        type: Sequelize.CHAR
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
    await queryInterface.dropTable('Reservas');
  }
};