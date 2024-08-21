'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallesCompra extends Model {
    static associate(models) {
      DetallesCompra.belongsTo(models.Compra, {
        foreignKey: "detalleCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      DetallesCompra.belongsTo(models.Producto, {
        foreignKey: "productoCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  DetallesCompra.init({
    detalleCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Compras", key: "id", constraints: false, },
    },
    productoCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Productos", key: "id", constraints: false, },
    },
    cantidadCpr: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    precioUnitario: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    descuentoCpr: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    precioTotalDetalle: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
  }, {
    sequelize,
    modelName: 'DetallesCompra',
    tableName: 'DetallesCompras',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return DetallesCompra;
};