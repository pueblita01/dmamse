'use strict';
import { Permiso } from './permiso'
import { Modulo } from './modulo'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permisos_modulos extends Model {
    static associate(models) {
      Modulo.belongsToMany(models.Permiso, {
        through: Permisos_modulos
      })
      Permiso.belongsToMany(models.Modulo, {
        through: Permisos_modulos
      })
    }
  }
  Permisos_modulos.init({
    permisoModuloId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Permisos", key: "id", constraints: false, },
    },
    moduloPermisoId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Modulos", key: "id", constraints: false, },
    },
  }, {
    sequelize,
    modelName: 'Permisos_modulos',
    tableName: "Permisos_modulos",
    timestamps: false,
    createdAt: false,
    updatedAt: false,

  });
  return Permisos_modulos;
};