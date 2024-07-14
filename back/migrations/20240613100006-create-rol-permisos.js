'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rol_permisos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rolPermisoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Roles", key: "id", constraints: false, },
      },
      permisoRolId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Permisos", key: "id", constraints: false, },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rol_permisos');
  }
};