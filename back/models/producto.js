'use strict';
const { models, sequelize } = require("../SequelizeConnection");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        as: 'Categorias',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",

      });
      Producto.belongsTo(models.Familia, {
        foreignKey: "familiaId",
        as: 'Familias',
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Producto.belongTo(models.Proveedor, {
        foreignKey: "proveedorProdId",
        as: 'Proveedores',
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      });
      Producto.hasMany(models.DetallesVenta, {
        as: "DetallesVentas",
        foreignKey: "productoVtaId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Producto.hasMany(models.DetallesCompra, {
        as: "DetallesCompras",
        foreignKey: "productoCprId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

    }
  }
  //categoria refiere a marca , Familia(RUBRO) Deporte,alimento, bazar..,SubFamilia plasticos,metal,
  // movimiento (entrada/salida) //categoria como una marca ej Granix

  Producto.init({
    // sequelize.define(
    //   "Producto",
    //   {
    simboloProducto: {
      allowNull: true,
      type: DataTypes.STRING
    },
    codigoBarra: {
      allowNull: true,
      type: DataTypes.STRING
    },
    proveedorProdId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Proveedores", key: "id", constraints: false, },
    },
    categoriaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Categorias", key: "id", constraints: false, },
    },
    familiaId: {
      allowNull: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Familias", key: "id", constraints: false, },
    },

    nombre: {
      allowNull: true,
      type: DataTypes.STRING
    },
    descripcion: {
      allowNull: true,
      type: DataTypes.STRING
    },
    precioPorKilo: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    unidadMedida: {
      allowNull: true,
      type: DataTypes.STRING
    },
    presentacion: {
      allowNull: true,
      type: DataTypes.STRING
    },
    precioCosto: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    precioUnidad: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    precioSugerido: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    precioActual: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2)
    },
    stockActual: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    stockMinimo: {
      allowNul: true,
      type: DataTypes.INTEGER
    },
    fechaCreacion: {
      allowNull: false,
      type: DataTypes.DATE
    },
    movimiento: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
    ultimaActualizacion: {
      allowNull: true,
      type: DataTypes.DATE
    },
    suelto: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },


  },
    {

      sequelize,
      modelName: "Producto",
      tableName: "Productos",
      timestamps: false,
      createdAt: false,
      updatedAt: false,


    }


  )
  Producto.sequelize.define("Productos")
  return Producto
}
