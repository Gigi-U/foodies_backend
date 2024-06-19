const db = require('../db/db');

class UsuarioController {
    // Obtengo todos los usuarios
    consultarTodos(req, res) {
        const sql = 'SELECT * FROM usuario';
        db.query(sql, (err, usuarios) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(usuarios);
        });
    }

    // Obtengo usuario por ID
    consultarPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM usuario WHERE id = ?';
        db.query(sql, [id], (err, usuarios) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(usuarios);
        });
    }

    // Agrego nuevo usuario
    altaUsuario(req, res) {
        const { nombre, password, estado } = req.body;
        const sql = 'INSERT INTO usuario (nombre, password, estado) VALUES(?,?,?)';
        db.query(sql, [nombre, password, estado], (err, usuario) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Usuario creado', usuarioId: usuario.insertId });
        });
    }

    // Modifico usuario por ID
    modificarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, password, estado } = req.body;
        const sql = 'UPDATE usuario SET nombre = ?, password = ?, estado = ? WHERE id = ?';
        db.query(sql, [nombre, password, estado, id], (err, usuario) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Usuario editado' });
        });
    }

    // Elimino usuario por ID
    eliminarUsuario(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM usuario WHERE id = ?';
        db.query(sql, [id], (err, usuario) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Usuario eliminado' });
        });
    }
}

const usuarioController = new UsuarioController();

module.exports = usuarioController;