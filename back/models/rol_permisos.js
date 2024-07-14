'use strict';
import { Rol } from "./rol"
import { Permiso } from "./permiso"
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol_permisos extends Model {
    static associate(models) {
      Rol.belongsToMany(models.Permiso, {
        through: Rol_permisos
      })
      Permiso.belongsToMany(models.Rol, {
        through: Rol_permisos
      })
    }
  }
  Rol_permisos.init({
    rolPermisoId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Roles", key: "id", constraints: false, },
    },
    permisoRolId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Permisos", key: "id", constraints: false, },
    },
  }, {
    sequelize,
    modelName: 'Rol_permisos',
    tableName: 'Rol_permisos',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Rol_permisos;
};