'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Telefonos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigopais: {
        type: Sequelize.STRING(6),
        allowNull: true,
        validate: {
          is: /^\+\d{1,5}$/
        }
      },
      caracteristica: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: "El telefono tiene que tener 1 a 20 caracteres"
          }
        }
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
    await queryInterface.dropTable('Telefonos');
  }
};