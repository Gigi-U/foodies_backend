const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoController');

router.get("/", ProductoController.consultarTodos);
router.get("/:id", ProductoController.consultarPorId);
router.post("/", ProductoController.altaProducto);
router.put("/:id", ProductoController.modificarProducto);
router.delete("/:id", ProductoController.eliminarProducto);

module.exports = router;
