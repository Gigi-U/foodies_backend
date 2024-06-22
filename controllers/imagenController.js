const db = require('../db/db');

class ImagenController {
    // Obtener todas las imágenes
    consultarTodas(req, res) {
        const sql = 'SELECT * FROM imagen';
        db.query(sql, (err, imagenes) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(imagenes);
        });
    }

    // Obtener imagen por ID
    consultarPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM imagen WHERE imagen_id = ?';
        db.query(sql, [id], (err, imagen) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            if (imagen.length > 0) {
                res.json(imagen[0]);
            } else {
                res.status(404).json({ error: 'Imagen no encontrada' });
            }
        });
    }

    // Agregar nueva imagen
    altaImagen(req, res) {
        const { seccion,  url, producto_id, combo_id } = req.body;
        const sql = 'INSERT INTO imagen (seccion, url, producto_id, combo_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [seccion, url, producto_id, combo_id], (err, resultado) => {
            if (err) {
                console.error('Error al agregar imagen', err);
                res.status(500).json({ error: 'Error al agregar imagen' });
                return;
            }
            res.json({ message: 'Imagen agregada', imagenId: resultado.insertId });
        });
    }

    // Editar imagen por ID
    modificarImagen(req, res) {
        const { id } = req.params;
        const {  seccion,  url, producto_id, combo_id  } = req.body;
        const sql = 'UPDATE imagen SET seccion = ?, url = ?, producto_id = ?, combo_id = ? WHERE imagen_id = ?';
        db.query(sql, [seccion, url, producto_id, combo_id,  id], (err, resultado) => {
            if (err) {
                console.error('Error al editar imagen', err);
                res.status(500).json({ error: 'Error al editar imagen' });
                return;
            }
            if (resultado.affectedRows === 0) {
                res.status(404).json({ error: 'Imagen no encontrada' });
                return;
            }
            res.json({ message: 'Imagen editada' });
        });
    }

    // Eliminar imagen por ID
    eliminarImagen(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM imagen WHERE imagen_id = ?';
        db.query(sql, [id], (err, resultado) => {
            if (err) {
                console.error('Error al eliminar imagen', err);
                res.status(500).json({ error: 'Error al eliminar imagen' });
                return;
            }
            if (resultado.affectedRows === 0) {
                res.status(404).json({ error: 'Imagen no encontrada' });
                return;
            }
            res.json({ message: 'Imagen eliminada' });
        });
    }
}

const imagenController = new ImagenController();

module.exports = imagenController;
