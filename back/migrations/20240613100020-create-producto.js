'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      simboloProducto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      codigoBarra: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      proveedorProdId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Proveedores',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categorias',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      familiaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Familias',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      precioPorKilo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      unidadMedida: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      presentacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      precioCosto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      precioUnidad: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      precioSugerido: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      precioActual: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      stockActual: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      stockMinimo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fechaCreacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      movimiento: {
        type: Sequelize.CHAR, // Asegúrate de que esto sea lo que deseas
        allowNull: true,
      },
      ultimaActualizacion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      suelto: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Productos');
  }
};
