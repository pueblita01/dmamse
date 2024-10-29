'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Cliente, {
        as: "ClienteResv",
        foreignKey: "clienteReservaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Reserva.belongsTo(models.Proveedor, {
        as: "ProveedorResv",
        foreignKey: "proveedorReservaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Reserva.belongsTo(models.Empleado, {
        as: "EmpleadoResv",
        foreignKey: "empleadoReservaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Reserva.init({
    clienteReservaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    proveedorReservaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id" },
    },
    empleadoReservaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Empleados", key: "id" },
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
  });

  return Reserva;
};
