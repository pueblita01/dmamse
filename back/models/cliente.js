'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Usuario, {
        foreignKey: "usuarioCId",
        as: "Usuarios",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Cliente.belongsTo(models.RazonSocial, {
        foreignKey: "razonSocialCId",
        as: "RazonesSociales",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Cliente.belongsTo(models.TipoDni, {
        foreignKey: " tipoDniCId",
        as: "TiposDni",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });
      Cliente.hasMany(models.Direccion, {
        as: 'Direcciones',
        foreignKey: 'direccionId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Cliente.hasMany(models.Telefono, {
        as: 'Telefonos',
        foreignKey: 'telefonoCId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Cliente.hasMany(models.Venta, {
        as: 'Ventas',
        foreignKey: 'clienteVtaId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Cliente.hasMany(models.Reserva, {
        as: 'Reservas',
        foreignKey: 'clienteReservaId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Cliente.hasMany(models.Cheque, {
        as: 'Cheques',
        foreignKey: 'clienteCHId',
        sourceKey: 'id',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }

  Cliente.init({
    usuarioCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id", constraints: false, },
    },
    razonSocialCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "RazonesSociales", key: "id", constraints: false, },
    },
    tipoDniCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "TiposDni", key: "id", constraints: false, },
    },
    direccionCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Direcciones", key: "id", constraints: false, },
    },
    telefonoCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Telefonos", key: "id", constraints: false, },
    },
    nombreCliente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cuilcuitC: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido"
        }
      }
    },
    cumpleaños: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    tipoCliente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: "Clientes",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  // Cliente.sequelize.define("Clientes")
  return Cliente;
};