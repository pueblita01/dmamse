'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido"
          }
        }
      },
      // 20240612234420-create-usuario.js
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 20],
            msg: "La contraseña tiene que tener de 4 a 20 caracteres"
          }
        }
      },
      registrado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fechaDeRegistro: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Usuarios');
  }
};