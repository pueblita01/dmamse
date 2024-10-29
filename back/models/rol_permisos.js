'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rol_permisos extends Model {
    static associate(models) {
      // Relación muchos a muchos: Rol pertenece a muchos Permisos a través de Rol_permisos
      Rol_permisos.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        as: 'RolAsociado', // Alias único
      });
      Rol_permisos.belongsTo(models.Permiso, {
        foreignKey: 'permisoId',
        as: 'PermisoAsociado', // Alias único
      });
    }
  }

  Rol_permisos.init({
    rolId: {
      type: DataTypes.INTEGER,
      references: { model: 'Roles', key: 'id' },
      allowNull: false,
    },
    permisoId: {
      type: DataTypes.INTEGER,
      references: { model: 'Permisos', key: 'id' },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Rol_permisos',
    tableName: 'RolPermisos',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return Rol_permisos;
};
