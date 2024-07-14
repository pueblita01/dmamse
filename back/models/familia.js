'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Familia extends Model {
    static associate(models) {
      Familia.hasMany(models.Producto, {
        as: 'Productos',
        foreignKey: 'familiaId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      Familia.hasMany(models.Subfamilia, {
        as: 'Subfamilias',
        foreignKey: 'subfamiliaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Familia.init({
    nombreFamilia: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    subfamiliaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Subfamilias", key: "id", constraints: false, },
    },
  }, {
    sequelize,
    modelName: 'Familia',
    tableName: "Familias",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  // Familia.sequelize.define("Familias")
  return Familia;
};