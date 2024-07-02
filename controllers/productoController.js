const db = require('../db/db');

class ProductoController {
    // Obtengo todos los productos con sus imágenes
    consultarTodos(req, res) {
        const sql = `
            SELECT p.id, p.nombre AS producto_nombre, p.descripcion AS producto_descripcion,
                   p.precio AS producto_precio, p.stock AS producto_stock,
                   i.imagen_id, i.url AS imagen_url, i.seccion, i.producto_id, i.combo_id
            FROM producto p
            LEFT JOIN imagen i ON p.id = i.producto_id AND i.seccion = 'producto'
            ORDER BY p.id, i.imagen_id;
        `;
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }

            const productos = agruparProductosConImagenes(results);

            res.json(productos);
        });
    }

    // Obtengo producto por ID con sus imágenes
    consultarPorId(req, res) {
        const { id } = req.params;
        const sql = `
            SELECT p.id AS producto_id, p.nombre AS producto_nombre, p.descripcion AS producto_descripcion,
                   p.precio AS producto_precio, p.stock AS producto_stock,
                   i.imagen_id, i.url AS imagen_url, i.seccion, i.producto_id, i.combo_id
            FROM producto p
            LEFT JOIN imagen i ON p.id = i.producto_id AND i.seccion = 'producto'
            WHERE p.id = ?
            ORDER BY i.imagen_id;
        `;
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }

            const productos = agruparProductosConImagenes(results);

            if (productos.length > 0) {
                res.json(productos[0]);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
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

    // Obtener imágenes de un producto por ID
    consultarImagenesProducto(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM imagen WHERE seccion = "producto" AND producto_id = ?';
        db.query(sql, [id], (err, imagenes) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            res.json(imagenes);
        });
    }

    // Obtener una imagen específica por ID
    consultarImagenPorId(req, res) {
        const { id, imagen_id } = req.params;
        const sql = 'SELECT * FROM imagen WHERE imagen_id = ? AND seccion = "producto" AND producto_id = ?';
        db.query(sql, [imagen_id, id], (err, imagen) => {
            if (err) {
                console.error('Error ejecutando la consulta', err);
                res.status(500).json({ error: 'Error ejecutando la consulta' });
                return;
            }
            if (imagen.length > 0) {
                res.json(imagen[0]);
            } else {
                res.status(404).json({ error: 'Imagen no encontrada o no pertenece a un producto' });
            }
        });
    }


    // Editar imagen de un producto por ID de imagen
    editarImagenProducto(req, res) {
        const { id } = req.params; // ID de la imagen
        const { url } = req.body;
        const sql = 'UPDATE imagen SET url = ? WHERE imagen_id = ? AND seccion = "producto"';
        db.query(sql, [url, id], (err, resultado) => {
            if (err) {
                console.error('Error al editar imagen', err);
                res.status(500).json({ error: 'Error al editar imagen' });
                return;
            }
            if (resultado.affectedRows === 0) {
                res.status(404).json({ error: 'Imagen no encontrada o no pertenece a un producto' });
                return;
            }
            res.json({ message: 'Imagen de producto editada' });
        });
    }

}

function agruparProductosConImagenes(results) {
    const productos = [];
    let productoActual = null;

    results.forEach(row => {
        if (row.producto_id !== productoActual?.id) {
            // Nuevo producto encontrado
            productoActual = {
                id: row.id,
                nombre: row.producto_nombre,
                descripcion: row.producto_descripcion,
                precio: row.producto_precio,
                stock: row.producto_stock,
                imagenes: []
            };
            productos.push(productoActual);
        }

        // Agregar la imagen al producto actual si existe
        if (row.imagen_id) {
            productoActual.imagenes.push({
                id: row.imagen_id,
                url: row.imagen_url,
                seccion: row.seccion,
                producto_id: row.producto_id,
                combo_id: row.combo_id
            });
        }
    });

    return productos;
}

const productoController = new ProductoController();

module.exports = productoController;
