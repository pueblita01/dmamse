'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteVtaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      cajaVtaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cajas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      facturaVtaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Facturas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      fechaVta: {
        allowNull: true,
        type: Sequelize.DATE
      },
      utilidad: {
        allowNull: true,
        type: Sequelize.STRING
      },
      totalVta: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ventas');
  }
};
