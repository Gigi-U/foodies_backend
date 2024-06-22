const express = require('express');
const router = express.Router();
const ImagenController = require('../controllers/imagenController');

// Rutas para imágenes de producto
router.get("/", ImagenController.consultarTodas);
router.get("/:id", ImagenController.consultarPorId);
router.post("/", ImagenController.altaImagen);
router.put("/:id", ImagenController.modificarImagen);
router.delete("/:id", ImagenController.eliminarImagen);

/* // Rutas para imágenes de combo
router.get('/combo/:id/imagen', imagenController.consultarImagenesCombo);
router.post('/combo/:id/imagen', imagenController.agregarImagenCombo);
router.delete('/combo/imagen/:id', imagenController.eliminarImagenCombo); */

module.exports = router;