'use strict';
const {
  Model
} = require('sequelize');
const { now } = require('sequelize/lib/utils');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasOne(models.Admin, {
        foreignKey: "usuarioAId",
        as: "Usuarios",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      Usuario.hasOne(models.Cliente, {
        foreignKey: "usuarioCId",
        as: "Usuarios",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      Usuario.hasOne(models.Proveedor, {
        foreignKey: "usuarioPId",
        as: "Usuarios",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
      Usuario.hasMany(models.Cierre, {
        as: 'Cierres',
        foreignKey: 'usuarioCierreId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    };
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
          msg: "El email tiene que ser un correo valido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 20],
          msg: "La contraseña tiene que tener de 4 a 20 caracteres"
        }
      }
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
    // paranoid:true
    // freezeTableName:true,
    timestamps: true,
    createdAt: false,
    updatedAt: true,
  });
  return Usuario;
};


