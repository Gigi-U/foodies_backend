const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoController');

router.get("/", ProductoController.consultarTodos.bind(ProductoController));
router.get("/:id", ProductoController.consultarPorId.bind(ProductoController));
router.post("/", ProductoController.altaProducto.bind(ProductoController));
router.put("/:id", ProductoController.modificarProducto.bind(ProductoController));
router.delete("/:id", ProductoController.eliminarProducto.bind(ProductoController));

module.exports = router;
