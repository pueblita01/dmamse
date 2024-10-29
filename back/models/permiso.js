'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permiso extends Model {
    static associate(models) {
      // Relación muchos a muchos: Permiso pertenece a muchos Roles a través de Rol_permisos
      models.Permiso.belongsToMany(models.Usuario, {
        through: models.Usuarios_roles,
        as: 'UsuariosAsociadosPermiso',
        foreignKey: 'permisoId',
      });
      
    }
  }
  Permiso.init({
    permisoOperacion: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
  }, {
    sequelize,
    modelName: 'Permiso',
    tableName: 'Permisos',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Permiso;
};