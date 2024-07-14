'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioCId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Usuarios", key: "id", constraints: false, },
      },
      razonSocialCId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "RazonesSociales", key: "id", constraints: false, },
      },
      tipoDniCId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "TiposDni", key: "id", constraints: false, },
      },
      direccionCId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Direcciones", key: "id", constraints: false, },
      },
      telefonoCId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Telefonos", key: "id", constraints: false, },
      },
      nombreCliente: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cuilcuitC: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido"
          }
        }
      },
      cumpleaños: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      tipoCliente: {
        allowNull: true,
        type: Sequelize.STRING,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};