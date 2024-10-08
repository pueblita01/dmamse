'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cierre extends Model {
    static associate(models) {
      Cierre.belongsTo(models.Usuario, {
        foreignKey: "usuarioCierreId",
        as: "Usuarios",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
    }
  }
  Cierre.init({
    usuarioCierreId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id", constraints: false, },
    },
    fechaCierre: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    tipoCierre: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    descripcion: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Cierre',
    tableName: 'Cierres',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
  return Cierre;
};