'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazonSocial extends Model {
  
    static associate(models) {
      RazonSocial.hasOne(models.Cliente, {
        foreignKey: "razonSocialCId",
        as: "Clientes",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      RazonSocial.hasOne(models.Proveedor, {
        foreignKey: "razonSocialPId",
        as: "Proveedores",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
    }
  }
  RazonSocial.init({
    razonSocial: {
      allowNull: true,
      type: DataTypes.CHAR
    },

  }, {
    sequelize,
    modelName: 'RazonSocial',
    tableName: "RazonesSociales",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return RazonSocial;
};