'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cheques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proveedorCHId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Proveedores", key: "id", constraints: false, },
      },
      clienteCHId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Clientes", key: "id", constraints: false, },
      },
      numeroCheque: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      banco: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fechaEmision: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      fechaCobro: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      montoCheque: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable('Cheques');
  }
};