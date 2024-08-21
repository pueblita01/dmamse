const { models } = require("../../SequelizeConnection");
const Cliente = models.Cliente;
const Usuario = models.Usuario;
const RazonSocial = models.RazonSocial;
const TipoDni = models.TipoDni;
const Direccion = models.Direccion;
const Telefono = models.Telefono;

module.exports = {
    create: async (req, res) => {
      
        try {
            const nuevaRazonSocial = await RazonSocial.create({
                razonSocial:req.params.razonSocial
            });
            console.log("req.body", req.params.razonSocial);
            const { nombreCliente, cuilcuitC, email, cumpleaños, tipoCliente } = req.body;

            // Asignar tipoCliente por defecto si no se proporciona
            const tipoClienteDefault = tipoCliente || "CFinal";

            // Crear un nuevo cliente
            const nuevoCliente = await Cliente.create({
                razonSocialCId: nuevaRazonSocial.id,
                nombreCliente,
                cuilcuitC,
                email,
                cumpleaños,
                tipoCliente: tipoClienteDefault
            });
            res.status(201).json({
                cliente: nuevoCliente,
                razonSocial: nuevaRazonSocial
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    getAll: async (req, res) => {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            res.status(500).json({ error: 'Error al obtener los clientes' });
        }
    },
    getById: async (req, res) => {
        try {
            const cliente = await Cliente.findByPk(req.params.id_cliente);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            res.status(200).json(cliente);
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            res.status(500).json({ error: 'Error al obtener el cliente' });
        }
    },
    update: async (req, res) => {
        try {
            const cliente = await Cliente.findByPk(req.params.id_cliente);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            const { nombreCliente, cuilcuitC, email, cumpleaños, tipoCliente } = req.body;

            // Actualizar cliente con los nuevos datos
            await cliente.update({
                nombreCliente,
                cuilcuitC,
                email,
                cumpleaños,
                tipoCliente
            });

            res.status(200).json(cliente);
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            res.status(500).json({ error: 'Error al actualizar el cliente' });
        }
    },
    delete: async (req, res) => {
        try {
            const cliente = await Cliente.findByPk(req.params.id_cliente);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            await cliente.destroy();

            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
    }
};