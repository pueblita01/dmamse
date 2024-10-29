'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoDni extends Model {
    static associate(models) {
      TipoDni.hasOne(models.Cliente, {
        foreignKey: "tipoDniCId",
        // as: "Clientes",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      TipoDni.hasOne(models.Proveedor, {
        foreignKey: "tipoDniPId",
        // as: "Proveedores",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      TipoDni.hasOne(models.Empleado, {
        foreignKey: "tipoDniEId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
    }
  }
  TipoDni.init({
    tipoDNI: {
      allowNull: true,
      type: DataTypes.CHAR
    },
    nroDNI: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'TipoDni',
    tableName: "TiposDni",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return TipoDni;
};