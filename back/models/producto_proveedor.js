'use strict';
import { Proveedor } from './proveedor'
import { Producto } from './producto'

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Proveedor extends Model {
    static associate(models) {
      Proveedor.belongsToMany(models.Producto, {
        through: Producto_Proveedor
      })
      Producto.belongsToMany(models.Proveedor, {
        through: Producto_Proveedor
      })
    }
  }
  Producto_Proveedor.init({
    productoProvId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Productos", key: "id", constraints: false, },
    },
    proveedorProdId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id", constraints: false, },
    },
  }, {
    sequelize,
    modelName: 'Producto_Proveedor',
    tableName: "Producto_Proveedor",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Producto_Proveedor;
};