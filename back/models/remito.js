'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Remito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Remito.init({
    nroFactura: DataTypes.INTEGER,
    // idProducto: DataTypes.INTEGER,
    tipo: DataTypes.CHAR,
    // nroProveedor: DataTypes.INTEGER,
    // nroCliente: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    concepto: DataTypes.CHAR,
    importeNeto: DataTypes.INTEGER,
    estado: DataTypes.CHAR,
    formaDePago: DataTypes.CHAR,
    iva: DataTypes.INTEGER,
    iibb: DataTypes.INTEGER,
    fechaDePago: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    observaciones: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Remito',
    tableName: "Remitos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Remito;
};