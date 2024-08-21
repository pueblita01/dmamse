'use strict';
const { Model, DataTypes } = require('sequelize');
const Proveedor = require('./proveedor');
const Producto = require('./producto');

module.exports = (sequelize) => {
  class Producto_Proveedor extends Model {
    static associate(models) {
      models.Proveedor.belongsToMany(models.Producto, {
        through: models.Producto_Proveedor
      });
      models.Producto.belongsToMany(models.Proveedor, {
        through: models.Producto_Proveedor
      });
    }
  }

  Producto_Proveedor.init({
    productoProvId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Productos", key: "id", constraints: false },
    },
    proveedorProdId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id", constraints: false },
    },
  }, {
    sequelize,
    modelName: 'Producto_Proveedor',
    tableName: 'Producto_Proveedor',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Producto_Proveedor;
};
