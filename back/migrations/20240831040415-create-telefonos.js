'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Telefonos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigopais: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      caracteristica: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      clienteTelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      proveedorTelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proveedores',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Telefonos');
  }
};
