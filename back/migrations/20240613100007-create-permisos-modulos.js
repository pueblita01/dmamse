'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permisos_modulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permisoModuloId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Permisos", key: "id", constraints: false, },
      },
      moduloPermisoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Modulos", key: "id", constraints: false, },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permisos_modulos');
  }
};