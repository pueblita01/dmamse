'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Telefono extends Model {
    static associate(models) {
      Telefono.belongsTo(models.Cliente, {
        as: 'ClienteTel',
        foreignKey: 'clienteTelId',
        constraints: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Telefono.belongsTo(models.Proveedor, {
        as: 'ProveedorTel',
        foreignKey: 'proveedorTelId',
        constraints: false,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });

      Telefono.belongsTo(models.Empleado, {
        as: 'EmpleadoTel',
        foreignKey: 'empleadoTelId',
        constraints: false,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
    }
  }

  Telefono.init({
    codigopais: {
      type: DataTypes.STRING(6),
      allowNull: true,
      validate: {
        is: /^\+\d{1,5}$/
      }
    },
    caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: "El teléfono tiene que tener de 1 a 20 caracteres"
        }
      }
    },
    clienteTelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Clientes',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE', 
    },
    proveedorTelId: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Proveedores',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    },
    empleadoTelId: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Empleados',
        key: 'id',
      },
    
    },
  }, {
    sequelize,
    modelName: 'Telefono',
    tableName: 'Telefonos',
    timestamps: false,
  });

  return Telefono;
};
