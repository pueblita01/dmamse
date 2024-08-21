'use strict';
const {
  Model
} = require('sequelize');
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
        as: 'Proveedores',
        foreignKey: "proveedorCHId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Cheque.belongsTo(models.Cliente, {
        as: 'Clientes',
        foreignKey: "clienteCHId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Cheque.init({
    proveedorCHId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id", constraints: false, },
    },
    clienteCHId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id", constraints: false, },
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
    tableName: 'Cheques'
  });
  return Cheque;
};