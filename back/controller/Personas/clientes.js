const { models } = require("../../SequelizeConnection");
const Cliente = models.Cliente;
const RazonSocial = models.RazonSocial;
const TipoDni = models.TipoDni;
const Direccion = models.Direccion;
const Telefono = models.Telefono;
const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = {
    // const isValidCuil = (cuil) => {
    //   return /^\d{11}$/.test(cuil);
    // };
    // if (!isValidCuil(cuilcuitC)) {
    //   return res.status(400).json({ message: 'CUIL/CUIT inválido' });
    // }
  createCliente: async (req, res) => {
    const { nombreCliente, cuilcuitC, email, direcciones, telefonos, razonSocial } = req.body;
    try {
      let razonSocialEncontrada = await RazonSocial.findOne({ where: { razonSocial } });
      if (!razonSocialEncontrada) {
        razonSocialEncontrada = await RazonSocial.create({ razonSocial });
      }
      const newCliente = await Cliente.create({
        nombreCliente,
        cuilcuitC,
        email,
        razonSocialCId: razonSocialEncontrada.id,
      });
      if (direcciones && Array.isArray(direcciones)) {
        const direccionesPromises = direcciones.map(direccion => {
          return Direccion.create({
            clienteDirId: newCliente.id,
            calle: direccion.calle,
            numero: direccion.numero,
            manzana: direccion.manzana,
            departamento: direccion.departamento,
            ciudad: direccion.ciudad,
            provincia: direccion.provincia,
            codigoPostal: direccion.codigoPostal,
            pais: direccion.pais,
            observaciones: direccion.observaciones,
          });
        });
        await Promise.all(direccionesPromises);
      }
      if (telefonos && Array.isArray(telefonos)) {
        const telefonosPromises = telefonos.map(telefono => {
          return Telefono.create({
            clienteTelId: newCliente.id,
            codigopais: telefono.codigopais,
            caracteristica: telefono.caracteristica,
            numero: telefono.numero,
          });
        });
        await Promise.all(telefonosPromises);
      }
      const clienteConDetalles = await Cliente.findOne({
        where: { id: newCliente.id },
        include: [
          { model: Direccion, as: 'DireccionesC' },
          { model: Telefono, as: 'TelefonosC' },
          { model: RazonSocial, as: 'RazonSocialC' }
        ],
      });

      res.status(201).json(clienteConDetalles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el cliente', error });
    }
  },

  updateCliente: async (req, res) => {
    const { nombreCliente, cuilcuitC, email, direcciones, telefonos, razonSocial } = req.body;
    const clienteId = req.params.id;
    // const isValidCuil = (cuil) => /^\d{11}$/.test(cuil);
    // if (!isValidCuil(cuilcuitC)) {
    //     return res.status(400).json({ message: 'CUIL/CUIT inválido' });
    // }
    try {
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        let razonSocialEncontrada = await RazonSocial.findOne({ where: { razonSocial } });
        if (!razonSocialEncontrada) {
            razonSocialEncontrada = await RazonSocial.create({ razonSocial });
        }
        await cliente.update({
            nombreCliente,
            cuilcuitC,
            email,
            razonSocialCId: razonSocialEncontrada.id,
        });
        if (direcciones && Array.isArray(direcciones)) {
            await Direccion.destroy({ where: { clienteDirId: cliente.id } });
            const direccionesPromises = direcciones.map((direccion) => {
                return Direccion.create({
                    clienteDirId: cliente.id,
                    calle: direccion.calle,
                    numero: direccion.numero,
                    manzana: direccion.manzana,
                    departamento: direccion.departamento,
                    ciudad: direccion.ciudad,
                    provincia: direccion.provincia,
                    codigoPostal: direccion.codigoPostal,
                    pais: direccion.pais,
                    observaciones: direccion.observaciones,
                });
            });
            await Promise.all(direccionesPromises);
        }

        // Actualizar teléfonos
        if (telefonos && Array.isArray(telefonos)) {
            await Telefono.destroy({ where: { clienteTelId: cliente.id } }); // Eliminar los teléfonos actuales
            const telefonosPromises = telefonos.map((telefono) => {
                return Telefono.create({
                    clienteTelId: cliente.id,
                    codigopais: telefono.codigopais,
                    caracteristica: telefono.caracteristica,
                    numero: telefono.numero,
                });
            });
            await Promise.all(telefonosPromises);
        }
        const clienteConDetalles = await Cliente.findOne({
            where: { id: cliente.id },
            include: [
                { model: Direccion, as: 'DireccionesC' },
                { model: Telefono, as: 'TelefonosC' },
                { model: RazonSocial, as: 'RazonSocialC' },
            ],
        });
        res.status(200).json(clienteConDetalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
},


  eliminarCliente: async (req, res) => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findByPk(id, {
        include: [
          {
            model: RazonSocial,
            as: 'RazonSocialC',
          },
        ],
      });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      await Direccion.destroy({
        where: { clienteDirId: id }
      });
      await Telefono.destroy({
        where: { clienteTelId: id }
      });
      if (cliente.RazonSocialC) {
        await RazonSocial.destroy({
          where: { id: cliente.razonSocialCId }
        });
      }
      await cliente.destroy();
      return res.status(200).json({ message: 'Cliente, razón social y datos asociados eliminados correctamente' });
    } catch (error) {
      console.error('Error eliminando el cliente:', error);
      return res.status(500).json({ error: 'Error eliminando el cliente' });
    }
  },

  buscarClientePorNombre: async (req, res) => {
    const { nombreCliente } = req.query; // Obtener el username desde la query string

    try {
      // Busca el cliente por username en la base de datos
      const cliente = await Cliente.findOne({ nombreCliente });

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      res.json(cliente);
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      res.status(500).json({ message: 'Error al buscar cliente' });
    }
  },
  getAll: async (req, res) => {
    const clientes = await Cliente.findAll({
      include: [
        { model: RazonSocial, as: 'RazonSocialC' },
        { model: TipoDni, as: 'TiposDniC' },
        { model: Direccion, as: 'DireccionesC' },
        { model: Telefono, as: 'TelefonosC' }
      ]
    });

    if (!clientes) {
      return res.status(400).json({ err: "No obtiene lista de clientes" });
    } else {
      return res.status(200).json(clientes);
    }
  },




  // sin usar

  obtenerDireccionesDeCliente: async (req, res) => {
    try {
      const clienteId = req.params.id_cliente;
      const direcciones = await Direccion.findAll({
        where: { clienteDirId: clienteId }
      });

      if (direcciones.length > 0) {
        res.json(direcciones);
      } else {
        res.status(404).json({ message: "No se encontraron direcciones para este cliente" });
      }
    } catch (error) {
      console.error('Error al obtener las direccioness:', error);
      res.status(500).json({ error: "Error al obtener las direcciones" });
    }
  },

  create: async (req, res) => {
    const transaction = await models.sequelize.transaction();

    try {
      // Extraer los valores del cuerpo de la solicitud
      const {
        nombreCliente,
        cuilcuitC,
        email,
        cumpleaños,
        tipoCliente,
        direcciones = [], // Un array de objetos para direcciones
        telefonos = [] // Un array de objetos para teléfonos
      } = req.body;

      // Crear la nueva razón social usando el parámetro de la URL
      const nuevaRazonSocial = await RazonSocial.create({
        razonSocial: req.params.razonSocial,
      }, { transaction });

      // Crear el nuevo DNI usando los parámetros de la URL
      const nuevoDni = await TipoDni.create({
        tipoDNI: req.params.tipoDNI,
        nroDNI: req.params.nroDNI,
      }, { transaction });

      // Crear un nuevo cliente con las relaciones correspondientes
      const nuevoCliente = await Cliente.create({
        razonSocialCId: nuevaRazonSocial.id,
        tipoDniCId: nuevoDni.id,
        nombreCliente,
        cuilcuitC,
        email,
        cumpleaños,
        tipoCliente: tipoCliente || "CFinal",
      }, { transaction });

      // Crear direcciones relacionadas si se proporcionaron
      if (direcciones.length > 0) {
        const direccionesConCliente = direcciones.map(d => ({
          ...d,
          clienteDirId: nuevoCliente.id // Asociar dirección al nuevo cliente
        }));
        await Direccion.bulkCreate(direccionesConCliente, { transaction });
      }

      // Crear teléfonos relacionados si se proporcionaron
      if (telefonos.length > 0) {
        const telefonosConCliente = telefonos.map(t => ({
          ...t,
          clienteTelId: nuevoCliente.id // Asociar teléfono al nuevo cliente
        }));
        await Telefono.bulkCreate(telefonosConCliente, { transaction });
      }

      // Confirmar la transacción
      await transaction.commit();

      // Responder con el cliente creado
      res.status(201).json({
        cliente: nuevoCliente,
        razonSocial: nuevaRazonSocial,
        tipoDNI: nuevoDni,
        direcciones: direcciones,
        telefonos: telefonos
      });

    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error creando cliente:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Agregar direcciones a un cliente existente
  addDirecciones: async (req, res) => {
    const transaction = await models.sequelize.transaction();

    try {
      const clienteId = req.params.clienteId; // Obtener el ID del cliente desde los parámetros de la URL
      const direcciones = req.body.direcciones; // Obtener el array de direcciones desde el cuerpo de la solicitud

      // Verificar que el cliente existe
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      // Verificar que `direcciones` es un array
      if (!Array.isArray(direcciones)) {
        return res.status(400).json({ error: 'El campo "direcciones" debe ser un array' });
      }

      // Asignar el ID del cliente a cada dirección
      const direccionesConCliente = direcciones.map(d => ({
        ...d,
        clienteDirId: clienteId, // Asociar dirección al cliente
      }));

      // Crear las direcciones
      const nuevasDirecciones = await Direccion.bulkCreate(direccionesConCliente, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      // Responder con las direcciones recién creadas
      res.status(201).json(nuevasDirecciones);

    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error al agregar direcciones:', error);
      res.status(500).json({ message: error.message });
    }
  },
  // Función para agregar teléfonos a un cliente
  addTelefonos: async (req, res) => {
    const transaction = await models.sequelize.transaction();

    try {
      const clienteId = req.params.clienteId; // Obtener el ID del cliente desde los parámetros de la URL
      const telefonos = req.body.telefonos; // Obtener el array de teléfonos desde el cuerpo de la solicitud

      // Verificar que el cliente existe
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      // Verificar que `telefonos` es un array
      if (!Array.isArray(telefonos)) {
        return res.status(400).json({ error: 'El campo "telefonos" debe ser un array' });
      }

      // Asignar el ID del cliente a cada teléfono
      const telefonosConCliente = telefonos.map(t => ({
        ...t,
        clienteTelId: clienteId, // Asociar teléfono al cliente
      }));

      // Crear los teléfonos
      const nuevosTelefonos = await Telefono.bulkCreate(telefonosConCliente, { transaction });

      // Confirmar la transacción
      await transaction.commit();

      // Responder con los teléfonos recién creados
      res.status(201).json(nuevosTelefonos);

    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error al agregar teléfonos:', error);
      res.status(500).json({ message: error.message });
    }
  },


  // Obtener un cliente por ID
  getById: async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id, {
        include: [
          { model: RazonSocial, as: 'RazonSocialC' },
          { model: TipoDni, as: 'TiposDniC' },
          { model: Direccion, as: 'DireccionesC' },
          { model: Telefono, as: 'TelefonosC' }
        ]
      });

      if (!cliente) {
        return res.status(404).json({ error: "No hay cliente con ese ID" });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      console.error("Error al obtener cliente:", error);
      return res.status(500).json({ error: "Error al obtener cliente" });
    }
  },

  // Actualizar un cliente
  update: async (req, res) => {
    const transaction = await models.sequelize.transaction();

    try {
      const clienteId = req.params.id;
      const {
        nombreCliente,
        cuilcuitC,
        email,
        cumpleaños,
        tipoCliente,
        razonSocial,
        tipoDNI,
        direcciones = [],
        telefonos = []
      } = req.body;

      const cliente = await Cliente.findByPk(clienteId, { transaction });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      if (razonSocial) {
        const [razonSocialInstance, created] = await RazonSocial.upsert({
          id: cliente.razonSocialCId,
          razonSocial
        }, { transaction });
        cliente.razonSocialCId = razonSocialInstance.id;
      }
      if (tipoDNI) {
        const [tipoDniInstance, created] = await TipoDni.upsert({
          id: cliente.tipoDniCId,
          ...tipoDNI
        }, { transaction });
        cliente.tipoDniCId = tipoDniInstance.id;
      }

      // Actualizar cliente
      await cliente.update({
        nombreCliente,
        cuilcuitC,
        email,
        cumpleaños,
        tipoCliente
      }, { transaction });

      // Actualizar direcciones
      if (direcciones.length > 0) {
        await Promise.all(direcciones.map(async d => {
          if (d.id) {
            await Direccion.update(d, { where: { id: d.id }, transaction });
          } else {
            await Direccion.create({ ...d, clienteDirId: cliente.id }, { transaction });
          }
        }));
      }

      // Actualizar teléfonos
      if (telefonos.length > 0) {
        await Promise.all(telefonos.map(async t => {
          if (t.id) {
            await Telefono.update(t, { where: { id: t.id }, transaction });
          } else {
            await Telefono.create({ ...t, clienteTelId: cliente.id }, { transaction });
          }
        }));
      }

      // Confirmar la transacción
      await transaction.commit();

      // Obtener cliente actualizado con asociaciones
      const updatedCliente = await Cliente.findByPk(clienteId, {
        include: [
          { model: RazonSocial, as: 'RazonSocialC' },
          { model: TipoDni, as: 'TiposDniC' },
          { model: Direccion, as: 'DireccionesC' },
          { model: Telefono, as: 'TelefonosC' }
        ]
      });

      // Responder con el cliente actualizado
      res.status(200).json(updatedCliente);

    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  },
  // Eliminar un cliente
  delete: async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id_cliente);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      await cliente.destroy();

      // Eliminar las entidades asociadas
      await RazonSocial.destroy({ where: { id: cliente.razonSocialCId } });
      await TipoDni.destroy({ where: { id: cliente.tipoDniCId } });
      await Direccion.destroy({ where: { clienteDirId: cliente.id } });
      await Telefono.destroy({ where: { clienteTelId: cliente.id } });

      res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  }
};
