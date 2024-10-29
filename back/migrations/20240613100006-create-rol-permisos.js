'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RolPermisos', {
      rolId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id' },
      },
      permisoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Permisos', key: 'id' },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RolPermisos');
  }
};
