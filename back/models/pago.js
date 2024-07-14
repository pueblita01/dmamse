'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.TipoPago, {
        foreignKey: "tipoPagoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pago.belongsTo(models.Compra, {
        foreignKey: "pagoCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pago.belongsTo(models.Venta, {
        foreignKey: "pagoVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Pago.hasOne(models.Cheque, {
        foreignKey: "chequePagoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Pago.init({
    tipoPagoId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "TiposPagos", key: "id", constraints: false, },
    },
    pagoVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Ventas", key: "id", constraints: false, },
    },
    pagoCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Compras", key: "id", constraints: false, },
    },
    chequePagoId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Cheques", key: "id", constraints: false, },
    },
    montoPago: {
      allowNull: true,
      types: DataTypes.DECIMAL(10, 2)
    },
    cuotasCant: {
      allowNull: true,
      types: DataTypes.INTEGER
    },
    fechaPago: {
      allowNull: true,
      types: DataTypes.DATE
    },
    descripcion: {
      allowNull: true,
      types: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Pago',
    tableName: "Pagos",
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });
  return Pago;
};