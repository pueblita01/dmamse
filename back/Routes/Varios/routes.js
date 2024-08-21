// routes/varios

const express = require("express");
const router = new express.Router();
const controllerProducto= require("../../controller/Varios/productos");

// Rutas para el CRUD de productos
router.post("/producto/nuevo", controllerProducto.create);
router.get("/productos", controllerProducto.getAll);
router.get("/producto/existente/:id_producto", controllerProducto.getById);
router.put("/producto/:id_producto", controllerProducto.update);
router.delete("/producto/:id_producto", controllerProducto.delete);

module.exports = router;
