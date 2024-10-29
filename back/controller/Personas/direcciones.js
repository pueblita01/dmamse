const { models } = require("../../SequelizeConnection");
const Direccion = models.Direccion;

module.exports = {
    createDireccion: async (direccionData) => {
        try {
            // Extraer los datos de la dirección
            const { calle, altura, codigoPostal, manzana, departamento, ciudad, provincia, pais } = direccionData;

            // Crear una nueva dirección con los datos proporcionados
            const nuevaDireccion = await Direccion.create({
                calle,
                altura,
                codigoPostal,
                manzana,
                departamento,
                ciudad,
                provincia,
                pais
            });

            console.log('Dirección creada:', nuevaDireccion);

            // Devolver la nueva dirección creada
            return nuevaDireccion;
        } catch (error) {
            // Mostrar el error en consola
            console.error('Error al crear la dirección:', error);

            // Lanzar el error para que sea capturado en el controlador de cliente
            throw new Error('Error al crear la dirección');
        }
    },


    getAll: async (req, res) => {
        try {
            const razonesSociales = await Direccion.findAll();
            res.status(200).json(razonesSociales);
        } catch (error) {
            console.error('Error al obtener las razones sociales:', error);
            res.status(500).json({ error: 'Error al obtener las razones sociales' });
        }
    },

    getObtenerDireccionesDelCliente: async (req, res) => {
        try {
            const direccion = await Direccion.findByPk(req.params.clienteDirId);

            if (!direccion) {
                return res.status(404).json({ error: 'direccion no encontrada' });
            }

            res.status(200).json(direccion);
        } catch (error) {
            console.error('Error al obtener la direccion:', error);
            res.status(500).json({ error: 'Error al obtener la direccion' });
        }
    },

    update: async (req, res) => {
        try {
            const direccion = await Direccion.findByPk(req.params.id_razon_social);

            if (!direccion) {
                return res.status(404).json({ error: 'direccion no encontrada' });
            }

            const { direccion: nuevoRazonSocial } = req.body;

            // Actualizar direccion con los nuevos datos
            await direccion.update({
                direccion: nuevoRazonSocial
            });

            res.status(200).json(direccion);
        } catch (error) {
            console.error('Error al actualizar la direccion:', error);
            res.status(500).json({ error: 'Error al actualizar la direccion' });
        }
    },

    delete: async (req, res) => {
        try {
            const direccion = await Direccion.findByPk(req.params.id_razon_social);

            if (!direccion) {
                return res.status(404).json({ error: 'direccion no encontrada' });
            }

            await direccion.destroy();

            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar la direccion:', error);
            res.status(500).json({ error: 'Error al eliminar la direccion' });
        }
    }
};
