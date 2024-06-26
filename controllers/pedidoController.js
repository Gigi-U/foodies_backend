const db = require('../db/db');

class PedidoController {
    // Crear un nuevo pedido
    altaPedido(req, res) {
        const { nombreCliente, emailCliente, precioTotal, entregado, productos } = req.body;
        const sqlPedido = 'INSERT INTO pedido (nombre_cliente, email_cliente, precio_total, entregado) VALUES (?, ?, ?, ?)';
        
        db.query(sqlPedido, [nombreCliente, emailCliente, precioTotal, entregado], (err, result) => {
            if (err) {
                console.error('Error al crear pedido:', err);
                res.status(500).json({ error: 'Error al crear pedido' });
                return;
            }
            
            const pedidoId = result.insertId;
            const sqlPedidoProducto = 'INSERT INTO pedido_producto (pedido_id, producto_id, cantidad) VALUES ?';
            const pedidoProductoValues = productos.map(producto => [pedidoId, producto.id, producto.cantidad]);
            
            db.query(sqlPedidoProducto, [pedidoProductoValues], (err) => {
                if (err) {
                    console.error('Error al crear pedido_producto:', err);
                    res.status(500).json({ error: 'Error al crear pedido_producto' });
                    return;
                }

                res.json({ message: 'Pedido creado', pedidoId });
            });
        });
    }

    // Consultar todos los pedidos
    consultarTodos(req, res) {
        const sql = `
            SELECT p.*, 
                   pp.producto_id, pp.cantidad AS producto_cantidad, pr.nombre AS producto_nombre, pr.descripcion AS producto_descripcion, pr.precio AS producto_precio
            FROM pedido p
            LEFT JOIN pedido_producto pp ON p.id = pp.pedido_id
            LEFT JOIN producto pr ON pp.producto_id = pr.id;
        `;
        
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error al consultar pedidos:', err);
                res.status(500).json({ error: 'Error al consultar pedidos' });
                return;
            }

            const pedidos = agruparPedidosConProductos(results);
            res.json(pedidos);
        });
    }

    // Consultar pedido por ID
    consultarPorId(req, res) {
        const { id } = req.params;
        const sql = `
            SELECT p.*, 
                   pp.producto_id, pp.cantidad AS producto_cantidad, pr.nombre AS producto_nombre, pr.descripcion AS producto_descripcion, pr.precio AS producto_precio
            FROM pedido p
            LEFT JOIN pedido_producto pp ON p.id = pp.pedido_id
            LEFT JOIN producto pr ON pp.producto_id = pr.id
            WHERE p.id = ?;
        `;
        
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error al consultar pedido por ID:', err);
                res.status(500).json({ error: 'Error al consultar pedido por ID' });
                return;
            }

            const pedidos = agruparPedidosConProductos(results);
            if (pedidos.length > 0) {
                res.json(pedidos[0]);
            } else {
                res.status(404).json({ error: 'Pedido no encontrado' });
            }
        });
    }

    // Actualizar pedido por ID
    modificarPedido(req, res) {
        const { id } = req.params;
        const { nombreCliente, emailCliente, precioTotal, entregado, productos } = req.body;
        const sqlPedido = 'UPDATE pedido SET nombre_cliente = ?, email_cliente = ?, precio_total = ?, entregado = ? WHERE id = ?';
        
        db.query(sqlPedido, [nombreCliente, emailCliente, precioTotal, entregado, id], (err) => {
            if (err) {
                console.error('Error al actualizar pedido:', err);
                res.status(500).json({ error: 'Error al actualizar pedido' });
                return;
            }

            const sqlDeletePedidoProducto = 'DELETE FROM pedido_producto WHERE pedido_id = ?';
            
            db.query(sqlDeletePedidoProducto, [id], (err) => {
                if (err) {
                    console.error('Error al eliminar productos del pedido:', err);
                    res.status(500).json({ error: 'Error al eliminar productos del pedido' });
                    return;
                }

                const sqlPedidoProducto = 'INSERT INTO pedido_producto (pedido_id, producto_id, cantidad) VALUES ?';
                const pedidoProductoValues = productos.map(producto => [id, producto.id, producto.cantidad]);

                db.query(sqlPedidoProducto, [pedidoProductoValues], (err) => {
                    if (err) {
                        console.error('Error al actualizar pedido_producto:', err);
                        res.status(500).json({ error: 'Error al actualizar pedido_producto' });
                        return;
                    }

                    res.json({ message: 'Pedido actualizado' });
                });
            });
        });
    }

    // Eliminar pedido por ID
    eliminarPedido(req, res) {
        const { id } = req.params;
        const sqlDeletePedidoProducto = 'DELETE FROM pedido_producto WHERE pedido_id = ?';
        
        db.query(sqlDeletePedidoProducto, [id], (err) => {
            if (err) {
                console.error('Error al eliminar productos del pedido:', err);
                res.status(500).json({ error: 'Error al eliminar productos del pedido' });
                return;
            }

            const sqlDeletePedido = 'DELETE FROM pedido WHERE id = ?';
            db.query(sqlDeletePedido, [id], (err) => {
                if (err) {
                    console.error('Error al eliminar pedido:', err);
                    res.status(500).json({ error: 'Error al eliminar pedido' });
                    return;
                }

                res.json({ message: 'Pedido eliminado' });
            });
        });
    }
}

function agruparPedidosConProductos(results) {
    const pedidos = [];
    let pedidoActual = null;

    results.forEach(row => {
        if (row.id !== pedidoActual?.id) {
            pedidoActual = {
                id: row.id,
                nombreCliente: row.nombre_cliente,
                emailCliente: row.email_cliente,
                precioTotal: row.precio_total,
                entregado: row.entregado,
                productos: []
            };
            pedidos.push(pedidoActual);
        }

        if (row.producto_id) {
            pedidoActual.productos.push({
                id: row.producto_id,
                nombre: row.producto_nombre,
                descripcion: row.producto_descripcion,
                precio: row.producto_precio,
                cantidad: row.producto_cantidad
            });
        }
    });

    return pedidos;
}

const pedidoController = new PedidoController();

module.exports = pedidoController;
