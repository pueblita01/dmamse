'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallesVenta extends Model {
    static associate(models) {
      DetallesVenta.belongsTo(models.Venta, {
        foreignKey: "detalleVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      DetallesVenta.belongsTo(models.Producto, {
        foreignKey: "productoVtaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  DetallesVenta.init({
    detalleVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Ventas", key: "id", constraints: false, },
    },
    productoVtaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Productos", key: "id", constraints: false, },
    },
    cantidad: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    precioUnitario: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    descuentoVta: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    precioTotalDetalleVta: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },

  }, {
    sequelize,
    modelName: 'DetallesVenta',
    tableName: "DetallesVentas",
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  });
  return DetallesVenta;
};