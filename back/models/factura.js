'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    static associate(models) {
      Factura.belongsTo(models.Caja, {
        as: "CajaF",
        foreignKey: "facturaCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Factura.hasOne(models.Venta, {
        as: "VentasF",
        foreignKey: "facturaVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Factura.hasOne(models.Compra, {
        as: "ComprasF",
        foreignKey: "facturaCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Factura.init({
    nroFactura: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    facturaCajaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Facturas", key: "id", constraints: false, },
    },
    tipo: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
    nroProveedor: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    nroCliente: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    fecha: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    concepto: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    importeNeto: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    estado: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
    formaDePago: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
    iva: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    iibb: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    fechaDePago: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    cantidad: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    observaciones: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    anulado: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },

  }, {
    sequelize,
    modelName: 'Factura',
    tableName: 'Facturas',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });
  Factura.sequelize.define("Facturas")
  return Factura;
};