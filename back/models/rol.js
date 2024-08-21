'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {


    }
  }
  Rol.init({
    tipoRol: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: "Roles",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Rol;
};