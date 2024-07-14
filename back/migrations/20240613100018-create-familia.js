'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Familias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreFamilia: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      subfamiliaId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Subfamilias", key: "id", constraints: false, },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Familias');
  }
};