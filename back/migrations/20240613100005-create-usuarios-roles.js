'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios_roles', {
      usuarioRId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id', constraints: false },
      },
      rolUsuarioId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id', constraints: false },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios_roles');
  }
};
