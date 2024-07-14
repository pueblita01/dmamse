'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovimientosBancario extends Model {
    static associate(models) {
      MovimientosBancario.belongsTo(models.Caja, {
        foreignKey: "movbanCajaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  MovimientosBancario.init({
    movbanCajaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Cajas", key: "id", constraints: false, },
    },
    movimiento: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'MovimientosBancario',
    tableName: 'MovimientosBancarios',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return MovimientosBancario;
};