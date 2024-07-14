'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cajas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaCaja: {
        allowNull: true,
        type: Sequelize.DATE
      },
      montoinicial: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      montoFinal: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      tipoCaja: {
        allowNull: true,
        type: Sequelize.CHAR
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cajas');
  }
};