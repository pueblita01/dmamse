'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cierre extends Model {
    static associate(models) {
      Cierre.belongsTo(models.Usuario, {
        foreignKey: "usuarioCierreId",
        as: "UsuarioCierre",  // Asegúrate de que este alias sea único
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
    }
  }

  Cierre.init({
    usuarioCierreId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",  // Asegúrate de que esto coincida con el nombre de la tabla en la base de datos
        key: "id",
        constraints: false,
      },
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
    updatedAt: false,
  });

  return Cierre;
};
