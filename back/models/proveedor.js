'use strict';
const { models } = require("../SequelizeConnection");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    static associate(models) {
      Proveedor.belongsTo(models.Usuario, {
        foreignKey: "usuarioPId",
        as: "Usuarios",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Proveedor.belongsTo(models.RazonSocial, {
        foreignKey: " razonSocialPId",
        as: "RazonesSociales",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Proveedor.belongsTo(models.TipoDni, {
        foreignKey: "tipoDniPId",
        as: "TiposDni",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Proveedor.hasMany(models.Direccion, {
        as: 'Direcciones',
        foreignKey: 'direccionPId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Proveedor.hasMany(models.Telefono, {
        as: 'Telefonos',
        foreignKey: 'telefonoPId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Proveedor.hasMany(models.Producto, {
        foreignKey: "proveedorProdId",
        as: "Productos",
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      });
      Proveedor.hasMany(models.Compra, {
        as: 'Compras',
        foreignKey: 'proveedorCprId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Proveedor.hasMany(models.Reserva, {
        as: 'Reservas',
        foreignKey: 'proveedorReservaId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Proveedor.hasMany(models.Cheque, {
        as: 'Cheques',
        foreignKey: 'proveedorCHId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

    }
  }
  Proveedor.init({
    usuarioPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id", constraints: false, },
    },
    razonSocialPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "RazonesSociales", key: "id", constraints: false, },
    },
    tipoDniPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "TiposDni", key: "id", constraints: false, },
    },
    direccionPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Direcciones", key: "id", constraints: false, },
    },
    telefonoPId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Telefonos", key: "id", constraints: false, },
    },
    nombreEmpresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuilcuitP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    notas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "Proveedor",
    tableName: "Proveedores",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Proveedor.sequelize.define("Proveedores"),
  Proveedor;
};