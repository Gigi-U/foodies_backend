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
        const sql = 'UPDATE usuario SET nombre = ?, password = ?, estado = ?';
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

        //Validar inicio de sesion
        validarInicioSesion(req, res) {
            const { nombre, password } = req.body;
        
            // Buscar usuario por nombre de usuario en la base de datos
            const sql = 'SELECT * FROM usuario WHERE nombre = ?';
            db.query(sql, [nombre], (err, usuarios) => {
                if (err) {
                    console.error('Error ejecutando la consulta', err);
                    res.status(500).json({ error: 'Error ejecutando la consulta' });
                    return;
                }
        
                if (usuarios.length === 0) {
                    res.status(401).json({ authenticated: false, error: 'Usuario no encontrado' });
                    return;
                }
        
                const usuario = usuarios[0];
        
                // Compara la contraseña ingresada con la contraseña almacenada
                if (password === usuario.password) {
                    // Si las contraseñas coinciden, el usuario está validado
                    res.json({ authenticated: true, message: 'Inicio de sesión exitoso', usuarioId: usuario.id });
                } else {
                    // Si las contraseñas no coinciden, devuelve un mensaje de error
                    res.status(401).json({ authenticated: false, error: 'Contraseña incorrecta' });
                }
            });
        }
}

const usuarioController = new UsuarioController();

module.exports = usuarioController;