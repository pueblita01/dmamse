'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetallesCompra extends Model {
    static associate(models) {
      DetallesCompra.belongsTo(models.Compra, {
        as: 'CompraDetalle',
        foreignKey: 'detalleCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DetallesCompra.belongsTo(models.Producto, {
        as: 'ProductoDetalle',
        foreignKey: 'productoCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  DetallesCompra.init({
    detalleCprId: {
      allowNull: false, // Cambiado a false porque debe ser requerido
      type: DataTypes.INTEGER,
      references: {
        model: 'Compras',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productoCprId: {
      allowNull: false, // Cambiado a false porque debe ser requerido
      type: DataTypes.INTEGER,
      references: {
        model: 'Productos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    cantidadCpr: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    precioUnitario: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    descuentoCpr: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    precioTotalDetalle: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
  }, {
    sequelize,
    modelName: 'DetallesCompra',
    tableName: 'DetallesCompras',
    timestamps: false,
  });

  return DetallesCompra;
};
