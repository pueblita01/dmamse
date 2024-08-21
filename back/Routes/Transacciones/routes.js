const express = require("express");
const router = new express.Router();

const controllerVenta = require("../../controller/transacciones/ventas");
const controllerCompra= require("../../controller/transacciones/compras");


// Rutas para el CRUD de ventas
router.post("/venta/nueva", controllerVenta.create);
router.get("/ventas", controllerVenta.getAll);
router.get("/venta/existente/:id_venta", controllerVenta.getById);
router.put("/venta/:id_venta", controllerVenta.update);
router.delete("/venta/:id_venta", controllerVenta.delete);

// Rutas para el CRUD de compras
router.post("/compra/nueva", controllerCompra.create);
router.get("/compras", controllerCompra.getAll);
router.get("/compra/existente/:id_compra", controllerCompra.getById);
router.put("/compra/:id_compra", controllerCompra.update);
router.delete("/compra/:id_compra", controllerCompra.delete);

module.exports = router;
