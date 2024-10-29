'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subfamilia extends Model {
    static associate(models) {
      // Subfamilia pertenece a una Familia
      Subfamilia.belongsTo(models.Familia, {
        foreignKey: 'familiaId', // Corregido de subfamiliaId a familiaId
        as: 'FamiliasSub',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      });
    }
  }
  
  Subfamilia.init({
    nombreSubfamilia: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    familiaId: { // Corregido de subfamiliaId a familiaId
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: 'Familias', key: 'id', constraints: false },
    },
  }, {
    sequelize,
    modelName: 'Subfamilia',
    tableName: 'Subfamilias',
    timestamps: false,
  });

  return Subfamilia;
};
