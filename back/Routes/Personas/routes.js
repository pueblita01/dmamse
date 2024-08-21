const express = require("express");
const router = new express.Router();
const controllerCliente = require("../../controller/Personas/clientes");
const controllerProveedor = require("../../controller/Personas/proveedores");
const controllerRazonSocial = require("../../controller/Personas/razonSocial");

// Rutas para el CRUD de clientes
router.post("/cliente/nuevo/:razonSocial", controllerCliente.create);
router.get("/clientes", controllerCliente.getAll);
router.get("/cliente/existente/:id_cliente", controllerCliente.getById);
router.put("/cliente/:id_cliente", controllerCliente.update);
router.delete("/cliente/:id_cliente", controllerCliente.delete);

// Rutas para el CRUD de proveedores
router.post("/proveedor/nuevo", controllerProveedor.create);
router.get("/proveedores", controllerProveedor.getAll);
router.get("/proveedor/existente/:id_proveedor", controllerProveedor.getById);
router.put("/proveedor/:id_proveedor", controllerProveedor.update);
router.delete("/proveedor/:id_proveedor", controllerProveedor.delete);


// Rutas para el CRUD de razones sociales
router.post("/razonSocial/nueva", controllerRazonSocial.create);
router.get("/razonesSociales", controllerRazonSocial.getAll);
router.get("/razonSocial/existente/:id_razon_social", controllerRazonSocial.getById);
router.put("/razonSocial/:id_razon_social", controllerRazonSocial.update);
router.delete("/razonSocial/:id_razon_social", controllerRazonSocial.delete);

module.exports = router;
