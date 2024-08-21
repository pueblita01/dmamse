// controllers/productos.js

const { models } = require("../../SequelizeConnection");
const Producto = models.Producto;

module.exports = {
  // Crear un nuevo producto
  create: async (req, res) => {
    try {
      const {
        simboloProducto, codigoBarra, proveedorProdId, categoriaId, familiaId,
        nombre, descripcion, precioPorKilo, unidadMedida, presentacion,
        precioCosto, precioUnidad, precioSugerido, precioActual,
        stockActual, stockMinimo, fechaCreacion, movimiento, ultimaActualizacion, suelto
      } = req.body;

      const nuevoProducto = await Producto.create({
        simboloProducto, codigoBarra, proveedorProdId, categoriaId, familiaId,
        nombre, descripcion, precioPorKilo, unidadMedida, presentacion,
        precioCosto, precioUnidad, precioSugerido, precioActual,
        stockActual, stockMinimo, fechaCreacion, movimiento, ultimaActualizacion, suelto
      });

      console.log('Producto creado:', nuevoProducto);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  // Obtener todos los productos
  getAll: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  // Obtener un producto por ID
  getById: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id_producto);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(producto);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  // Actualizar un producto por ID
  update: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id_producto);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const {
        simboloProducto, codigoBarra, proveedorProdId, categoriaId, familiaId,
        nombre, descripcion, precioPorKilo, unidadMedida, presentacion,
        precioCosto, precioUnidad, precioSugerido, precioActual,
        stockActual, stockMinimo, fechaCreacion, movimiento, ultimaActualizacion, suelto
      } = req.body;

      await producto.update({
        simboloProducto, codigoBarra, proveedorProdId, categoriaId, familiaId,
        nombre, descripcion, precioPorKilo, unidadMedida, presentacion,
        precioCosto, precioUnidad, precioSugerido, precioActual,
        stockActual, stockMinimo, fechaCreacion, movimiento, ultimaActualizacion, suelto
      });

      res.status(200).json(producto);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  // Eliminar un producto por ID
  delete: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id_producto);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      await producto.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};
