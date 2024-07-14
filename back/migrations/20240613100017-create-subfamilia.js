'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subfamilias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreSubfamilia: {
        allowNull: true,
        type: Sequelize.CHAR,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subfamilias');
  }
};