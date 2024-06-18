const db = require('../db/db');

class ProductoController {
    // prueba ping-pong
    consultarTodos(req, res) {
        const sql = 'SELECT * FROM producto';
        db.query(sql, (err, productos) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(productos);
        });
    }
    // Obtengo todos los productos
    consultarTodos(req, res) {
        const sql = 'SELECT * FROM producto';
        db.query(sql, (err, productos) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(productos);
        });
    }

    // Obtengo producto por ID
    consultarPorId(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM producto WHERE id = ?';
        db.query(sql, [id], (err, productos) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(productos);
        });
    }

    // Agrego nuevo producto
    altaProducto(req, res) {
        const { nombre, descripcion, precio, stock } = req.body;
        const sql = 'INSERT INTO producto (nombre, descripcion, precio, stock) VALUES(?,?,?,?)';
        db.query(sql, [nombre, descripcion, precio, stock], (err, producto) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Producto creado', productoId: producto.insertId });
        });
    }

    // Modifico producto por ID
    modificarProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;
        const sql = 'UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?';
        db.query(sql, [nombre, descripcion, precio, stock, id], (err, producto) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Producto editado' });
        });
    }

    // Elimino producto por ID
    eliminarProducto(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM producto WHERE id = ?';
        db.query(sql, [id], (err, producto) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json({ message: 'Producto eliminado' });
        });
    }
}

const productoController = new ProductoController();

module.exports = productoController;
