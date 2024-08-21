const { models } = require("../../SequelizeConnection");
const Compra = models.Compra;

module.exports = {
  // Crear una nueva compra
  create: async (req, res) => {
    try {
      const { proveedorCprId, cajaCprId, facturaCprId, fechaCompra, totalCompra } = req.body;
      
      const nuevaCompra = await Compra.create({
        proveedorCprId,
        cajaCprId,
        facturaCprId,
        fechaCompra,
        totalCompra
      });

      console.log('Compra creada:', nuevaCompra);
      res.status(201).json(nuevaCompra);
    } catch (error) {
      console.error('Error al crear la compra:', error);
      res.status(500).json({ error: 'Error al crear la compra' });
    }
  },

  // Obtener todas las compras
  getAll: async (req, res) => {
    try {
      const compras = await Compra.findAll();
      res.status(200).json(compras);
    } catch (error) {
      console.error('Error al obtener las compras:', error);
      res.status(500).json({ error: 'Error al obtener las compras' });
    }
  },

  // Obtener una compra por ID
  getById: async (req, res) => {
    try {
      const compra = await Compra.findByPk(req.params.id_compra);
      if (!compra) {
        return res.status(404).json({ error: 'Compra no encontrada' });
      }
      res.status(200).json(compra);
    } catch (error) {
      console.error('Error al obtener la compra:', error);
      res.status(500).json({ error: 'Error al obtener la compra' });
    }
  },

  // Actualizar una compra por ID
  update: async (req, res) => {
    try {
      const compra = await Compra.findByPk(req.params.id_compra);
      if (!compra) {
        return res.status(404).json({ error: 'Compra no encontrada' });
      }

      const { proveedorCprId, cajaCprId, facturaCprId, fechaCompra, totalCompra } = req.body;

      await compra.update({
        proveedorCprId,
        cajaCprId,
        facturaCprId,
        fechaCompra,
        totalCompra
      });

      res.status(200).json(compra);
    } catch (error) {
      console.error('Error al actualizar la compra:', error);
      res.status(500).json({ error: 'Error al actualizar la compra' });
    }
  },

  // Eliminar una compra por ID
  delete: async (req, res) => {
    try {
      const compra = await Compra.findByPk(req.params.id_compra);
      if (!compra) {
        return res.status(404).json({ error: 'Compra no encontrada' });
      }

      await compra.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
      res.status(500).json({ error: 'Error al eliminar la compra' });
    }
  }
};
