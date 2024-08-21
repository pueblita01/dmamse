'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      // Asociación con Proveedor
      Compra.belongsTo(models.Proveedor, {
        as: 'Proveedores',
        foreignKey: "proveedorCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Asociación con DetallesCompra
      Compra.hasMany(models.DetallesCompra, {
        as: "DetallesCompras",
        foreignKey: "detalleCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Asociación con Caja
      Compra.belongsTo(models.Caja, {
        foreignKey: "cajaCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Asociación con Factura
      Compra.belongsTo(models.Factura, {
        foreignKey: "facturaCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Asociación con Pago
      Compra.hasMany(models.Pago, {
        as: "Pagos",
        foreignKey: "pagoCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Compra.init({
    proveedorCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Proveedores",
        key: "id",
        constraints: false
      },
    },
    cajaCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Cajas",
        key: "id",
        constraints: false
      },
    },
    facturaCprId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Facturas",
        key: "id",
        constraints: false
      },
    },
    fechaCompra: {
      allowNull: true,
      type: DataTypes.DATE
    },
    totalCompra: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    sequelize, // Instancia de Sequelize
    modelName: 'Compra',
    tableName: "Compras",
    timestamps: false, // No utilizar timestamps
    createdAt: false, // No utilizar createdAt
    updatedAt: false, // No utilizar updatedAt
  });

  return Compra;
};
