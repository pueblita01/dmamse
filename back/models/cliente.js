'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Usuario, {
        as: "UsuarioC",
        foreignKey: "usuarioCId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Cliente.belongsTo(models.RazonSocial, {
        as: "RazonSocialC",
        foreignKey: "razonSocialCId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Cliente.belongsTo(models.TipoDni, {
        as: "TiposDniC",
        foreignKey: "tipoDniCId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        constraints: false,
      });

      Cliente.hasMany(models.Direccion, {
        as: 'DireccionesC', 
        foreignKey: 'clienteDirId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      Cliente.hasMany(models.Telefono, {
        as: "TelefonosC",
        foreignKey: 'clienteTelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      Cliente.hasMany(models.Venta, {
        as: 'VentasC',
        foreignKey: 'clienteVtaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Cliente.hasMany(models.Reserva, {
        as: 'ReservasC',
        foreignKey: 'clienteReservaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Cliente.hasMany(models.Cheque, {
        as: 'ChequesC',
        foreignKey: 'clienteCHId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Cliente.init({
    usuarioCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Usuarios", key: "id" },
    },
    razonSocialCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "RazonesSociales", key: "id" },
    },
    tipoDniCId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "TiposDni", key: "id" },
    },
    nombreCliente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cuilcuitC: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: true
  });

  return Cliente;
};

//     const DireccionController = require("./direcciones");
// const TelefonoController = require("./telefonos");
// // Función para crear una nueva dirección
// const createDireccion = require('./direcciones').createDireccion;
// // Función para crear un nuevo teléfono
// const createTelefono = require('./telefonos').createTelefono;