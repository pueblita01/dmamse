const { models } = require("../../SequelizeConnection");
const RazonSocial = models.RazonSocial;

module.exports = {
    create: async (req, res) => {
        try {
            const { razonSocial } = req.body;

            // Crear una nueva razón social
            const nuevaRazonSocial = await RazonSocial.create({
                razonSocial
            });

            // Mostrar en consola la razón social creada
            console.log('Razón Social creada:', nuevaRazonSocial);

            // Enviar respuesta exitosa
            res.status(201).json(nuevaRazonSocial);
        } catch (error) {
            // Mostrar el error en consola
            console.error('Error al crear la razón social:', error);

            // Enviar respuesta de error
            res.status(500).json({ error: 'Error al crear la razón social' });
        }
    },

    getAll: async (req, res) => {
        try {
            const razonesSociales = await RazonSocial.findAll();
            res.status(200).json(razonesSociales);
        } catch (error) {
            console.error('Error al obtener las razones sociales:', error);
            res.status(500).json({ error: 'Error al obtener las razones sociales' });
        }
    },

    getById: async (req, res) => {
        try {
            const razonSocial = await RazonSocial.findByPk(req.params.id_razon_social);

            if (!razonSocial) {
                return res.status(404).json({ error: 'Razón Social no encontrada' });
            }

            res.status(200).json(razonSocial);
        } catch (error) {
            console.error('Error al obtener la razón social:', error);
            res.status(500).json({ error: 'Error al obtener la razón social' });
        }
    },

    update: async (req, res) => {
        try {
            const razonSocial = await RazonSocial.findByPk(req.params.id_razon_social);

            if (!razonSocial) {
                return res.status(404).json({ error: 'Razón Social no encontrada' });
            }

            const { razonSocial: nuevoRazonSocial } = req.body;

            // Actualizar razón social con los nuevos datos
            await razonSocial.update({
                razonSocial: nuevoRazonSocial
            });

            res.status(200).json(razonSocial);
        } catch (error) {
            console.error('Error al actualizar la razón social:', error);
            res.status(500).json({ error: 'Error al actualizar la razón social' });
        }
    },

    delete: async (req, res) => {
        try {
            const razonSocial = await RazonSocial.findByPk(req.params.id_razon_social);

            if (!razonSocial) {
                return res.status(404).json({ error: 'Razón Social no encontrada' });
            }

            await razonSocial.destroy();

            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar la razón social:', error);
            res.status(500).json({ error: 'Error al eliminar la razón social' });
        }
    }
};
