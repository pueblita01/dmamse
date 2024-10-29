'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proveedorCprId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Proveedores',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      cajaCprId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cajas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      facturaCprId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Facturas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      fechaCompra: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      totalCompra: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Compras');
  }
};
