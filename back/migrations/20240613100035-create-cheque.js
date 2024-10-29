'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cheques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proveedorCHId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Proveedores',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      clienteCHId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cheques');
  }
};
