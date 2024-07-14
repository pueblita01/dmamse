'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoIva extends Model {
    static associate(models) {
    }
  }
  TipoIva.init({
    tipoIva: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'TipoIva',
    tableName: "TiposIva",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return TipoIva;
};