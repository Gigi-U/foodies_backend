const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", authController.consultarTodos);
router.post("/altaUsuario", authController.altaUsuario);
router.post("/login", authController.login);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send('Hola Usuario ${req.userId}');
});

module.exports = router;