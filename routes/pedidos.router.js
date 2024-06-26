const express = require('express');
const router = express.Router();
const pedidoController= require('../controllers/pedidoController');

// Definir las rutas
router.get('/', pedidoController.consultarTodos);
router.get('/:id', pedidoController.consultarPorId);
router.post('/', pedidoController.altaPedido);
router.put('/:id', pedidoController.modificarPedido);
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
