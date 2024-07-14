'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proveedores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      razonSocialPId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "RazonesSociales", key: "id", constraints: false, },
      },
      tipoDniPId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "TiposDni", key: "id", constraints: false, },
      },
      direccionPId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Direcciones", key: "id", constraints: false, },
      },
      telefonoPId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Telefonos", key: "id", constraints: false, },
      },
      nombreEmpresa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cuilcuitP: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contacto: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      notas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proveedores');
  }
};