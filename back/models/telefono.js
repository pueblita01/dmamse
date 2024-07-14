'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telefono extends Model {
    static associate(models) {
      Telefono.belongTo(models.Cliente,
        {
          as: "Clientes",
          foreignKey: "telefonoCId",
          constraints: false,
          onDelete: "SET NULL",
          onUpdate: "SET NULL"
        });
      Telefono.belongTo(models.Proveedor,
        {
          as: "Proveedores",
          foreignKey: "telefonoPId",
          constraints: false,
          onDelete: "SET NULL",
          onUpdate: "SET NULL"
        });
    }
  }
  Telefono.init({
    codigopais: {
      type: DataTypes.STRING(6),
      allowNull: true,
      validate: {
        is: /^\+\d{1,5}$/
      }
    },
    caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: "El telefono tiene que tener 1 a 20 caracteres"
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Telefono',
    tableName: "Telefonos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Telefono;
};