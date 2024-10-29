'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      Venta.belongsTo(models.Cliente, {
        as: "ClienteVta",
        foreignKey: "clienteVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.belongsTo(models.Empleado, {
        as: 'EmpleadoVenta',
        foreignKey: 'empleadoVtaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Venta.hasMany(models.DetallesVenta, {
        as: "DetallesVentas",
        foreignKey: "ventaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.belongsTo(models.Caja, {
        as: 'VentaCaja',
        foreignKey: "cajaVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.belongsTo(models.Factura, {
        as: 'FacturasVta',
        foreignKey: "facturaVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.hasMany(models.Pago, {
        as: "Pagos",
        foreignKey: "ventaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Venta.init({
    clienteVtaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    cajaVtaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Cajas", key: "id" },
    },
    facturaVtaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Facturas", key: "id" },
    },
    empleadoVtaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Empleados", key: "id" },
    },
    fechaVta: {
      allowNull: true,
      type: DataTypes.DATE
    },
    utilidad: {
      allowNull: true,
      type: DataTypes.STRING
    },
    totalVta: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: "Ventas",
    timestamps: true,
  });

  return Venta;
};
