'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permiso extends Model {

    static associate(models) {

    }
  }
  Permiso.init({
    permisoOperacion: {
      allowNull: true,
      types: DataTypes.CHAR
    }
  }, {
    sequelize,
    modelName: 'Permiso',
    tableName: "Permisos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Permiso;
};