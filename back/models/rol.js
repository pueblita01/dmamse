'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      // Relación muchos a muchos: Rol pertenece a muchos Permisos a través de Rol_permisos
      Rol.belongsToMany(models.Permiso, {
        through: models.Rol_permisos,
        as: 'PermisosAsociados', // Alias único
        foreignKey: 'rolId',
      });

      // Relación muchos a muchos: Rol pertenece a muchos Usuarios a través de Usuarios_roles
      Rol.belongsToMany(models.Usuario, {
        through: models.Usuarios_roles,
        as: 'UsuariosAsociados', // Alias único
        foreignKey: 'rolUsuarioId',
      });
    }
  }

  Rol.init({
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'Roles',
    timestamps: true,
    createdAt: false,  // El campo `createdAt` no se utilizará
    updatedAt: true,   // `updatedAt` se mantendrá para las actualizaciones
  });

  return Rol;
};
