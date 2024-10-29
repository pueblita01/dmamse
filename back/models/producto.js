'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      // Producto pertenece a una Categoria
      Producto.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'CategoriasPrd',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      
      // Producto pertenece a una Familia
      Producto.belongsTo(models.Familia, {
        foreignKey: 'familiaId',
        as: 'FamiliasPrd',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      // Producto pertenece a un Proveedor
      Producto.belongsTo(models.Proveedor, {
        foreignKey: 'proveedorProdId',
        as: 'ProveedoresPrd',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      // Producto tiene muchos DetallesVenta
      Producto.hasMany(models.DetallesVenta, {
        as: 'DetallesVentasPrd',
        foreignKey: 'productoVtaId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      // Producto tiene muchos DetallesCompra
      Producto.hasMany(models.DetallesCompra, {
        as: 'DetallesComprasPrd',
        foreignKey: 'productoCprId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Producto.init({
    simboloProducto: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    codigoBarra: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    proveedorProdId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Proveedores', key: 'id' },
    },
    categoriaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Categorias', key: 'id' },
    },
    familiaId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Familias', key: 'id' },
    },
    nombre: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    descripcion: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    precioPorKilo: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    unidadMedida: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    presentacion: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    precioCosto: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    precioUnidad: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    precioSugerido: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    precioActual: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    stockActual: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    stockMinimo: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    fechaCreacion: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    movimiento: {
      allowNull: true,
      type: DataTypes.CHAR,
    },
    ultimaActualizacion: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    suelto: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    litros: {  // Nuevo atributo para el volumen en litros
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    peso: {  // Nuevo atributo para el peso
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
    },
    cantidadPorEmpaque: {  // Nuevo atributo para la cantidad por empaque
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    tipoEmpaque: {  // Nuevo atributo para el tipo de empaque
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Productos',
    timestamps: false,
  });

  return Producto;
};
