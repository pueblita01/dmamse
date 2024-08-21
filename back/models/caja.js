'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caja extends Model {
    static associate(models) {
      Caja.hasMany(models.Venta, {
        as: "Ventas",
        foreignKey: "ventaCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Caja.hasMany(models.Compra, {
        as: "Compras",
        foreignKey: "cajaCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Caja.hasMany(models.Factura, {
        as: "Facturas",
        foreignKey: "facturaCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Caja.hasMany(models.MovimientosBancario, {
        as: "MovimientosBancarios",
        foreignKey: "movbanCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Caja.init({
    fechaCaja: {
      allowNull: true,
      type: DataTypes.DATE
    },
    montoinicial: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    montoFinal: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    tipoCaja: {
      allowNull: true,
      type: DataTypes.CHAR
    },
    descripcion: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Caja',
    tableName: 'Cajas',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Caja;
};