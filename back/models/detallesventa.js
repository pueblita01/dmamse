'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetallesVenta extends Model {
    static associate(models) {
      DetallesVenta.belongsTo(models.Venta, {
        as: 'VentaDetalle',
        foreignKey: 'detalleVtaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      DetallesVenta.belongsTo(models.Producto, {
        as: 'ProductoDetalle',
        foreignKey: 'productoVtaId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  DetallesVenta.init({
    detalleVtaId: {
      allowNull: false, // Cambiado a false porque debe ser requerido
      type: DataTypes.INTEGER,
      references: {
        model: 'Ventas',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productoVtaId: {
      allowNull: false, // Cambiado a false porque debe ser requerido
      type: DataTypes.INTEGER,
      references: {
        model: 'Productos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    cantidad: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    precioUnitario: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    descuentoVta: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    precioTotalDetalleVta: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
  }, {
    sequelize,
    modelName: 'DetallesVenta',
    tableName: 'DetallesVentas',
    timestamps: false,
    createdAt: false, // Asegúrate de tener `createdAt` y `updatedAt` configurados según tus necesidades
    updatedAt: false,
  });

  return DetallesVenta;
};
