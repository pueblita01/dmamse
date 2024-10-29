'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RazonSocial extends Model {
    static associate(models) {
      // Relación uno a uno: Una razón social puede estar asociada a un único cliente
      RazonSocial.hasOne(models.Cliente, {
        foreignKey: "razonSocialCId",
        as: "Cliente",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });

      // Relación uno a uno: Una razón social puede estar asociada a un único proveedor
      RazonSocial.hasOne(models.Proveedor, {
        foreignKey: "razonSocialPId",
        as: "Proveedor",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });

      RazonSocial.hasOne(models.Empleado, {
        foreignKey: "razonSocialEId",
        as: "Empleado",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });

    }

  }

  RazonSocial.init({
    razonSocial: {
      allowNull: true,
      type: DataTypes.STRING(255), // Ajuste para un string con un tamaño razonable
    },
  }, {
    sequelize,
    modelName: 'RazonSocial',
    tableName: "RazonesSociales",
    timestamps: false, // Sin timestamps
  });

  return RazonSocial;
};
