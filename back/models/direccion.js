'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      Direccion.belongsTo(models.Cliente, {
        foreignKey: 'clienteDirId',
        as: 'ClienteC',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Direccion.belongsTo(models.Proveedor, {
        foreignKey: 'proveedorDirId',
        as: 'ProveedorP',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Direccion.belongsTo(models.Empleado, {
        foreignKey: 'empleadoDirId',
        as: 'EmpleadoD',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Direccion.init({
    clienteDirId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Clientes", key: "id" },
    },
    proveedorDirId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id" },
    },
    empleadoDirId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Empleados", key: "id" },
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manzana: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoPostal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Direccion',
    tableName: 'Direcciones',
    timestamps: true,
  });

  return Direccion;
};
