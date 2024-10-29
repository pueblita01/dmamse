'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      Compra.belongsTo(models.Proveedor, {
        as: 'Proveedores',
        foreignKey: 'proveedorCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Compra.hasMany(models.DetallesCompra, {
        as: 'DetallesCompras',
        foreignKey: 'detalleCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Compra.belongsTo(models.Caja, {
        as: 'CajaCompra',
        foreignKey: 'cajaCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Compra.belongsTo(models.Factura, {
        as: 'FacturaCompra',
        foreignKey: 'facturaCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Compra.hasMany(models.Pago, {
        as: 'Pagos',
        foreignKey: 'pagoCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Compra.init({
    proveedorCprId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Proveedores', key: 'id' },
    },
    cajaCprId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Cajas', key: 'id' },
    },
    facturaCprId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Facturas', key: 'id' },
    },
    fechaCompra: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    totalCompra: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compras',
    timestamps: false,
  });

  return Compra;
};
