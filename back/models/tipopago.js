'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoPago extends Model {
    static associate(models) {
      TipoPago.hasMany(models.Pago, {
        as: "PagosTP",
        foreignKey: "tipoPagoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  TipoPago.init({
    tipoPago: {
      allowNull: true,
      type: DataTypes.CHAR
    },
  }, {
    sequelize,
    modelName: 'TipoPago',
    tableName: "TiposPagos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return TipoPago;
};