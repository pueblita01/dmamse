'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      simboloProducto: {
        allowNull: true,
        type: Sequelize.STRING
      },
      codigoBarra: {
        allowNull: true,
        type: Sequelize.STRING
      },
      proveedorProdId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Proveedores", key: "id", constraints: false, },
      },
      categoriaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Categorias", key: "id" },
      },
      familiaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Familias", key: "id", constraints: false, },
      },

      nombre: {
        allowNull: true,
        type: Sequelize.STRING
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING
      },
      precioPorKilo: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      unidadMedida: {
        allowNull: true,
        type: Sequelize.STRING
      },
      presentacion: {
        allowNull: true,
        type: Sequelize.STRING
      },
      precioCosto: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      precioUnidad: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      precioSugerido: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      precioActual: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      stockActual: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      stockMinimo: {
        allowNul: true,
        type: Sequelize.INTEGER
      },
      fechaCreacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      movimiento: {
        allowNull: true,
        type: Sequelize.CHAR,
      },
      ultimaActualizacion: {
        allowNull: true,
        type: Sequelize.DATE
      },
      suelto: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};