'use strict';
import { Usuario } from './usuario'
import { Rol } from './rol'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios_roles extends Model {

    static associate(models) {
      Usuario.belongsToMany(models.Permiso, {
        through: Usuarios_roles
      })
      Rol.belongsToMany(models.Rol, {
        through: Usuarios_roles
      })
    }
  }
  Usuarios_roles.init({
    usuarioRId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id", constraints: false, },
    },
    rolUsuarioId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Roles", key: "id", constraints: false, },
    },

  }, {
    sequelize,
    modelName: 'Usuarios_roles',
    tableName: 'Usuarios_roles'
  });
  return Usuarios_roles;
};