'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Cliente, {
        foreignKey: "clienteReservaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Reserva.belongsTo(models.Proveedor, {
        foreignKey: "proveedorReservaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Reserva.init({
    clienteReservaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id", constraints: false, },
    },
    proveedorReservaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id", constraints: false, },
    },
    fechaResvInicio: {
      allowNull: true,
      types: DataTypes.DATE
    },
    fechaReservaFin: {
      allowNull: true,
      types: DataTypes.DATE
    },
    descripcionReserv: {
      allowNull: true,
      types: DataTypes.STRING
    },
    estado: {
      allowNull: true,
      types: DataTypes.BOOLEAN
    },
    modo: {
      allowNull: true,
      types: DataTypes.CHAR
    },
  }, {
    sequelize,
    modelName: 'Reserva',
    tableName: "Reservas",
    timestamps: false,
    createdAt: true,
    updatedAt: true,
  });
  return Reserva;
};