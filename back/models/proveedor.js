'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    static associate(models) {
      Proveedor.belongsTo(models.Usuario, {
        as: "UsuarioP",
        foreignKey: "usuarioPId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Proveedor.belongsTo(models.RazonSocial, {
        as: "RazonSocialP",
        foreignKey: "razonSocialPId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Proveedor.hasMany(models.Direccion, {
        as: 'DireccionesP', 
        foreignKey: 'proveedorDirId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      Proveedor.hasMany(models.Telefono, {
        as: "TelefonosP",
        foreignKey: 'proveedorTelId',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        constraints: false,
      });

      Proveedor.hasMany(models.Compra, {
        as: 'ComprasP',
        foreignKey: 'proveedorCompraId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Proveedor.init({
    usuarioPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id" },
    },
    razonSocialPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "RazonesSociales", key: "id" },
    },
    nombreProveedor: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cuilcuitP: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Proveedor',
    tableName: 'Proveedores',
    timestamps: true
  });

  return Proveedor;
};
