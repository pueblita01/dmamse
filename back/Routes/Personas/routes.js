const express = require("express");
const router = new express.Router();
const controllerCliente = require("../../controller/Personas/clientes");
const controllerProveedor = require("../../controller/Personas/proveedores");
const controllerRazonSocial = require("../../controller/Personas/razonSocial");
const controllerDireccion= require("../../controller/Personas/direcciones");
const controllerTelefono= require("../../controller/Personas/telefonos");

// CLIENTE 
// usados
router.post("/nuevocliente", controllerCliente.createCliente);
router.delete('/cliente/:id', controllerCliente.eliminarCliente);
router.put('/cliente/:id/', controllerCliente.updateCliente);
router.get('/buscar',controllerCliente.buscarClientePorNombre);
router.get('/clientes', controllerCliente.getAll);

// sin usar
router.post("/cliente/nuevo/:razonSocial/:tipoDNI/:nroDNI", controllerCliente.create);
router.post('/cliente/:clienteId/direcciones', controllerCliente.addDirecciones);
router.post('/cliente/:clienteId/telefonos', controllerCliente.addTelefonos);
router.get('/cliente/:id', controllerCliente.getById);
router.get('/cliente/direcciones/:id_cliente', controllerCliente.obtenerDireccionesDeCliente);


// PROVEEDOR
router.post("/proveedor/nuevo", controllerProveedor.create);
router.delete("/proveedor/:id_proveedor", controllerProveedor.delete);

router.get("/proveedores", controllerProveedor.getAll);
router.get("/proveedor/existente/:id_proveedor", controllerProveedor.getById);
router.put("/proveedor/:id_proveedor", controllerProveedor.update);

// DIRECCION
router.get('/direcciones', controllerDireccion.getAll);
// router.get('/direccion/:cliente', controllerCliente.obtenerDireccionesDeCliente);

// TELEFONO
router.get('/telefonos', controllerTelefono.getAll);

// RAZON SOCIAL
router.post("/razonSocial/nueva", controllerRazonSocial.create);
router.get("/razonesSociales", controllerRazonSocial.getAll);
router.get("/razonSocial/existente/:id_razon_social", controllerRazonSocial.getById);
router.put("/razonSocial/:id_razon_social", controllerRazonSocial.update);
router.delete("/razonSocial/:id_razon_social", controllerRazonSocial.delete);

module.exports = router;
