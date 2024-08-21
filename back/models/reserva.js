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
      type: DataTypes.DATE
    },
    fechaReservaFin: {
      allowNull: true,
      type: DataTypes.DATE
    },
    descripcionReserv: {
      allowNull: true,
      type: DataTypes.STRING
    },
    estado: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    modo: {
      allowNull: true,
      type: DataTypes.CHAR
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