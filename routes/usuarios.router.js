const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.get("/", UsuarioController.consultarTodos);
router.get("/:id", UsuarioController.consultarPorId);
router.post("/", UsuarioController.altaUsuario);
router.put("/:id", UsuarioController.modificarUsuario);
router.delete("/:id", UsuarioController.eliminarUsuario);

module.exports = router;