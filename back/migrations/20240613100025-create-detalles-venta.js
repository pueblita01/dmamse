'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallesVentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      detalleVtaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ventas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productoVtaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Productos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      cantidad: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      precioUnitario: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      descuentoVta: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
      precioTotalDetalleVta: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetallesVentas');
  }
};
