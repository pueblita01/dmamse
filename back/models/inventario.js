'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    static associate(models) {

    }
  }
  Inventario.init({
    // productoId: DataTypes.INTEGER,
    // categoriaId: DataTypes.INTEGER,
    // compras: DataTypes.INTEGER,
    // ventas: DataTypes.INTEGER,
    // stock: DataTypes.INTEGER,
    // precioVenta: DataTypes.INTEGER,
    // presentacion: DataTypes.CHAR,
    // utilidadPorProducto: DataTypes.INTEGER,
    // valorInventario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'Inventarios',
    timestamps: false,
    createdAt: false,
    updatedAt: false,

  });
  return Inventario;
};