const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoController');

router.get("/", ProductoController.consultarTodos);
router.get("/:id", ProductoController.consultarPorId);
router.post("/", ProductoController.altaProducto);
router.put("/:id", ProductoController.modificarProducto);
router.delete("/:id", ProductoController.eliminarProducto);

// Rutas para manejar imágenes dentro de productos
router.get("/:id/imagenes", ProductoController.consultarImagenesProducto);
router.get("/:id/imagenes/:imagen_id", ProductoController.consultarImagenPorId);
router.put("/:id/imagenes/:id", ProductoController.editarImagenProducto);

module.exports = router;
