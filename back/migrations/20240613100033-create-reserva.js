'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteReservaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      proveedorReservaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Proveedores',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      fechaResvInicio: {
        allowNull: true,
        type: Sequelize.DATE
      },
      fechaReservaFin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      descripcionReserv: {
        allowNull: true,
        type: Sequelize.STRING
      },
      estado: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      modo: {
        allowNull: true,
        type: Sequelize.CHAR
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservas');
  }
};
