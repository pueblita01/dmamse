'use strict';

const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteDirId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      proveedorDirId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proveedores',
          key: 'id'
        },
        onDelete: 'SET NULL', // Cambiado a SET NULL según el modelo de Telefono
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      empleadoDirId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Empleados", key: "id" },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      calle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      manzana: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ciudad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provincia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigoPostal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pais: {
        type: Sequelize.STRING,
        allowNull: false
      },
      observaciones: {
        type: Sequelize.STRING,
        allowNull: false
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Direcciones');
  }
};
