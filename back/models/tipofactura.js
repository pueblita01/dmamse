'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoFactura extends Model {
    static associate(models) {
      
    }
  }
  TipoFactura.init({
    tipoFactura: {
      allowNull:true,
      type: DataTypes.CHAR
    },
  }, {
    sequelize,
    modelName: 'TipoFactura',
    tableName: "TiposFacturas",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return TipoFactura;
};