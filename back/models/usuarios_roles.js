'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios_roles extends Model {
    static associate(models) {
      // Relación muchos a muchos: Usuario pertenece a muchos Permisos a través de Usuarios_roles
      models.Usuario.belongsToMany(models.Permiso, {
        through: Usuarios_roles,
        as: 'PermisosDeUsuario', // Alias único
        foreignKey: 'usuarioRId',
      });

      // Relación muchos a muchos: Rol pertenece a muchos Usuarios a través de Usuarios_roles
      models.Rol.belongsToMany(models.Usuario, {
        through: Usuarios_roles,
        as: 'UsuariosRoles', // Alias único
        foreignKey: 'rolUsuarioId',
      });
    }
  }

  Usuarios_roles.init({
    usuarioRId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Usuarios', key: 'id', constraints: false },
    },
    rolUsuarioId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Roles', key: 'id', constraints: false },
    },
  }, {
    sequelize,
    modelName: 'Usuarios_roles',
    tableName: 'Usuarios_roles',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Usuarios_roles;
};
