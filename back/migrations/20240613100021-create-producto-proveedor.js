'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Producto_Proveedor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productoProvId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Productos", key: "id", constraints: false, },
      },
      proveedorProdId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Proveedores", key: "id", constraints: false, },
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
    await queryInterface.dropTable('Producto_Proveedor');
  }
};