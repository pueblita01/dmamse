'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Relación uno a uno: Un usuario puede ser un admin
      Usuario.hasOne(models.Admin, {
        foreignKey: 'usuarioAId',
        as: 'UsuarioAdmin', // Alias único para la relación con Admin
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      });

      // Relación uno a uno: Un usuario puede ser un cliente
      Usuario.hasOne(models.Cliente, {
        foreignKey: 'usuarioCId',
        as: 'Cliente',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      });
      
      // Relación uno a uno: Un usuario puede ser un proveedor
      Usuario.hasOne(models.Proveedor, {
        foreignKey: 'usuarioPId',
        as: 'Proveedor',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      });
      
      // Relación uno a muchos: Un usuario puede tener múltiples cierres
      Usuario.hasMany(models.Cierre, {
        as: 'CierresU',
        foreignKey: 'usuarioCierreId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Usuario.init({
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo válido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 20],
          msg: "La contraseña tiene que tener de 4 a 20 caracteres",
        },
      },
    },
    registrado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fechaDeRegistro: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: "Usuarios",
    timestamps: true,
    createdAt: false,  // El campo `createdAt` no se utilizará
    updatedAt: true,   // `updatedAt` se mantendrá para las actualizaciones
  });

  return Usuario;
};
