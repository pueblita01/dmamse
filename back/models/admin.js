'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {

    static associate(models) {
      Admin.belongsTo(models.Usuario, {
        foreignKey: "usuarioAId",
        as: "Usuarios",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
    }
  }
  Admin.init({
    usuarioAId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id", constraints: false, },
    },
    nivelAcceso: {
      allowNull: true,
      type: DataTypes.CHAR
    },
    nombreEmpresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins',
    // paranoid:true
    // freezeTableName:true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  return Admin;
};