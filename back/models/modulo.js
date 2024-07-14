'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulo extends Model {
   
    static associate(models) {

    }
  }
  Modulo.init({
    nombre:{
      allowNull:true,
      types:DataTypes.CHAR,
    } 
  }, {
    sequelize,
    modelName: 'Modulo',
    tableName: "Modulos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Modulo;
};