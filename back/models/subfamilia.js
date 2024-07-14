'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subfamilia extends Model {
    static associate(models) {
      Subfamilia.belongsTo(models.Familia, {
        foreignKey: "subfamiliaId",
        as: 'Familias',
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  Subfamilia.init({
    nombreSubfamilia: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
  }, {
    sequelize,
    modelName: 'Subfamilia',
    tableName: "Subfamilias",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  Subfamilia.sequelize.define("Subfamilias")
  return Subfamilia;
};