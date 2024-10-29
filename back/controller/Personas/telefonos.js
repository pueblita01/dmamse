const { models } = require("../../SequelizeConnection");
const Telefono = models.Telefono;

module.exports = {
    createTelefono: async (telefonoData) => {
        try {
            // Extraer los datos del teléfono
            const { codigopais, caracteristica, numero } = telefonoData;

            // Crear un nuevo teléfono con los datos proporcionados
            const nuevoTelefono = await Telefono.create({
                codigopais,
                caracteristica,
                numero
            });

            console.log('Teléfono creado:', nuevoTelefono);

            // Devolver el nuevo teléfono creado
            return nuevoTelefono;
        } catch (error) {
            // Mostrar el error en consola
            console.error('Error al crear el teléfono:', error);

            // Lanzar el error para que sea capturado en el controlador de cliente
            throw new Error('Error al crear el teléfono');
        }
    },

    getAll: async (req, res) => {
        try {
            const telefonos = await Telefono.findAll();
            res.status(200).json(telefonos);
        } catch (error) {
            console.error('Error al obtener los teléfonos:', error);
            res.status(500).json({ error: 'Error al obtener los teléfonos' });
        }
    },

    getById: async (req, res) => {
        try {
            const telefono = await Telefono.findByPk(req.params.id);

            if (!telefono) {
                return res.status(404).json({ error: 'Teléfono no encontrado' });
            }

            res.status(200).json(telefono);
        } catch (error) {
            console.error('Error al obtener el teléfono:', error);
            res.status(500).json({ error: 'Error al obtener el teléfono' });
        }
    },

    update: async (req, res) => {
        try {
            const telefono = await Telefono.findByPk(req.params.id);

            if (!telefono) {
                return res.status(404).json({ error: 'Teléfono no encontrado' });
            }

            const { codigopais, caracteristica, numero } = req.body;

            // Actualizar teléfono con los nuevos datos
            await telefono.update({
                codigopais,
                caracteristica,
                numero
            });

            res.status(200).json(telefono);
        } catch (error) {
            console.error('Error al actualizar el teléfono:', error);
            res.status(500).json({ error: 'Error al actualizar el teléfono' });
        }
    },

    delete: async (req, res) => {
        try {
            const telefono = await Telefono.findByPk(req.params.id);

            if (!telefono) {
                return res.status(404).json({ error: 'Teléfono no encontrado' });
            }

            await telefono.destroy();

            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el teléfono:', error);
            res.status(500).json({ error: 'Error al eliminar el teléfono' });
        }
    }
};
