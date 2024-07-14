'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      Venta.belongsTo(models.Cliente, {
        foreignKey: "clienteVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.hasMany(models.DetallesVenta, {
        as: "DetallesVentas",
        foreignKey: "detalleVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.belongsTo(models.Caja, {
        as: 'Cajas',
        foreignKey: "ventaCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.belongsTo(models.Factura, {
        as: 'Facturas',
        foreignKey: "facturaVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Venta.hasMany(models.Pago, {
        as: "Pagos",
        foreignKey: "pagoVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Venta.init({
    clienteVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id", constraints: false, },
    },
    cajaVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Ventas", key: "id", constraints: false, },
    },
    facturaVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Facturas", key: "id", constraints: false, },
    },
    fechaVta: {
      allowNull: true,
      types: DataTypes.DATE
    },
    utilidad: {
      allowNull: true,
      types: DataTypes.STRING
    },
    totalVta: {
      allowNull: true,
      types: DataTypes.DECIMAL(10, 2)
    },
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: "Ventas",
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });
  return Venta;
};