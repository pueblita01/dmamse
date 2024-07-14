'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Producto, {
        foreignKey: 'categoriaId',
        as: 'Productos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    } 
  }
  Categoria.init({
    marca: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    codigoCategoria: {
      type: DataTypes.CHAR,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: "Categorias",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  Categoria.sequelize.define("Categorias")
  return Categoria;
};