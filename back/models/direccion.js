'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {

    static associate(models) {
      Direccion.belongTo(models.Cliente, {
        as: "Clientes",
        foreignKey: "direccionCId",
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      Direccion.belongTo(models.Proveedor, {
        as: "Proveedores",
        foreignKey: "direccionPId",
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
    }
  }
  Direccion.init({
    calle: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigoPostal: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    manzana: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    departamento: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    provincia: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    pais: {
      type: DataTypes.CHAR,
      allowNull: false,
      // validate:{isIn:[['AR','FR','CA','US','MX']]}
    },

  }, {
    sequelize,
    modelName: 'Direccion',
    tableName: "Direcciones",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Direccion;
};