// controllers/ventas.js
const { models } = require("../../SequelizeConnection");
const Venta = models.Venta;

module.exports = {
  // Crear una nueva venta
  create: async (req, res) => {
    try {
      const { clienteVtaId, cajaVtaId, facturaVtaId, fechaVta, utilidad, totalVta } = req.body;
      
      const nuevaVenta = await Venta.create({
        clienteVtaId,
        cajaVtaId,
        facturaVtaId,
        fechaVta,
        utilidad,
        totalVta
      });

      console.log('Venta creada:', nuevaVenta);
      res.status(201).json(nuevaVenta);
    } catch (error) {
      console.error('Error al crear la venta:', error);
      res.status(500).json({ error: 'Error al crear la venta' });
    }
  },

  // Obtener todas las ventas
  getAll: async (req, res) => {
    try {
      const ventas = await Venta.findAll();
      res.status(200).json(ventas);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      res.status(500).json({ error: 'Error al obtener las ventas' });
    }
  },

  // Obtener una venta por ID
  getById: async (req, res) => {
    try {
      const venta = await Venta.findByPk(req.params.id_venta);
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
      res.status(200).json(venta);
    } catch (error) {
      console.error('Error al obtener la venta:', error);
      res.status(500).json({ error: 'Error al obtener la venta' });
    }
  },

  // Actualizar una venta por ID
  update: async (req, res) => {
    try {
      const venta = await Venta.findByPk(req.params.id_venta);
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }

      const { clienteVtaId, cajaVtaId, facturaVtaId, fechaVta, utilidad, totalVta } = req.body;

      await venta.update({
        clienteVtaId,
        cajaVtaId,
        facturaVtaId,
        fechaVta,
        utilidad,
        totalVta
      });

      res.status(200).json(venta);
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      res.status(500).json({ error: 'Error al actualizar la venta' });
    }
  },

  // Eliminar una venta por ID
  delete: async (req, res) => {
    try {
      const venta = await Venta.findByPk(req.params.id_venta);
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }

      await venta.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      res.status(500).json({ error: 'Error al eliminar la venta' });
    }
  }
};
