// controller/Personas/proveedores.js

const { models } = require("../../SequelizeConnection");
const Proveedor = models.Proveedor;

module.exports = {
    create: async (req, res) => {
        try {
            const { nombreEmpresa, cuilcuitP, contacto, email, notas } = req.body;

            // Crear un nuevo proveedor
            const nuevoProveedor = await Proveedor.create({
                nombreEmpresa,
                cuilcuitP,
                contacto,
                email,
                notas
            });

            // Mostrar en consola el proveedor creado
            console.log('Proveedor creado:', nuevoProveedor);

            // Enviar respuesta exitosa
            res.status(201).json(nuevoProveedor);
        } catch (error) {
            // Mostrar el error en consola
            console.error('Error al crear el proveedor:', error);

            // Enviar respuesta de error
            res.status(500).json({ error: 'Error al crear el proveedor' });
        }
    },

    getAll: async (req, res) => {
        try {
            const proveedores = await Proveedor.findAll();
            res.status(200).json(proveedores);
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
            res.status(500).json({ error: 'Error al obtener los proveedores' });
        }
    },

    getById: async (req, res) => {
        try {
            const proveedor = await Proveedor.findByPk(req.params.id_proveedor);

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            res.status(200).json(proveedor);
        } catch (error) {
            console.error('Error al obtener el proveedor:', error);
            res.status(500).json({ error: 'Error al obtener el proveedor' });
        }
    },

    update: async (req, res) => {
        try {
            const proveedor = await Proveedor.findByPk(req.params.id_proveedor);

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            const { nombreEmpresa, cuilcuitP, contacto, email, notas } = req.body;

            // Actualizar proveedor con los nuevos datos
            await proveedor.update({
                nombreEmpresa,
                cuilcuitP,
                contacto,
                email,
                notas
            });

            res.status(200).json(proveedor);
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            res.status(500).json({ error: 'Error al actualizar el proveedor' });
        }
    },

    delete: async (req, res) => {
        try {
            const proveedor = await Proveedor.findByPk(req.params.id_proveedor);

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            await proveedor.destroy();

            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
            res.status(500).json({ error: 'Error al eliminar el proveedor' });
        }
    }
};
