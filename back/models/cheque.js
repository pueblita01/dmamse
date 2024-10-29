'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cheque extends Model {
    static associate(models) {
      Cheque.belongsTo(models.Pago, {
        as: 'Pagos',
        foreignKey: "chequePagoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Cheque.belongsTo(models.Proveedor, {
        as: 'ProveedorCH',
        foreignKey: "proveedorCHId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Cheque.belongsTo(models.Cliente, {
        as: 'ClienteCH',
        foreignKey: "clienteCHId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Cheque.belongsTo(models.Empleado, {
        as: 'EmpleadoCH',
        foreignKey: "empleadoCHId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Cheque.init({
    proveedorCHId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id" },
    },
    clienteCHId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    empleadoCHId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "Empleados", key: "id" },
    },
    numeroCheque: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    banco: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    fechaEmision: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    fechaCobro: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    montoCheque: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
  }, {
    sequelize,
    modelName: 'Cheque',
    tableName: 'Cheques',
    timestamps: false,
  });

  return Cheque;
};
