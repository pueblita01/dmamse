'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallesCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      detalleCprId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Compras',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productoCprId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Productos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      cantidadCpr: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      precioUnitario: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      descuentoCpr: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      precioTotalDetalle: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetallesCompras');
  }
};
