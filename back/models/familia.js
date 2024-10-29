'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Familia extends Model {
    static associate(models) {
      // Familia tiene muchas Subfamilias
      Familia.hasMany(models.Subfamilia, {
        as: 'Subfamilias',
        foreignKey: 'familiaId',  // Corregido de subfamiliaId a familiaId
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Familia tiene muchos Productos
      Familia.hasMany(models.Producto, {
        as: 'Productos',
        foreignKey: 'familiaId',
        onDelete: 'SET NULL',
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
      references: { model: "Subfamilias", key: "id", constraints: false },
    },
  }, {
    sequelize,
    modelName: 'Familia',
    tableName: 'Familias',
    timestamps: false,
  });

  return Familia;
};
