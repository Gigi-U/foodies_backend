const connection = require('../db/db');

// Obtener todos los pedidos
const getAllPedido = (req, res) => {
    connection.query('SELECT * FROM pedido', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener pedidos.' });
            return;
        }
        res.json(results);
    });
};

// Obtener un pedido por ID
const getPedidoById = (req, res) => {
    const pedidoId = req.params.id;
    connection.query('SELECT * FROM pedido WHERE id = ?', [pedidoId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el pedido.' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear un nuevo pedido
const createPedido = (req, res) => {
    const { nombreCliente, emailCliente, precioTotal, entregado, producto_id, combo_id } = req.body;

    // Validación de datos
    if (!nombreCliente || !emailCliente || precioTotal === undefined || producto_id === undefined || combo_id === undefined ) {
        res.status(400).json({ error: 'Faltan datos requeridos: nombreCliente, emailCliente o precioTotal.' });
        return;
    }

    const newPedido = {
        nombreCliente,
        emailCliente,
        precioTotal,
        entregado: entregado ? 1 : 0, // Asegurar que entregado sea 0 o 1
        producto_id,
        combo_id
    };

    console.log('Datos recibidos para crear el pedido:', newPedido); // Agregar este registro para verificar los datos

    connection.query('INSERT INTO pedido SET ?', newPedido, (err, result) => {
        if (err) {
            console.error('Error al crear el pedido:', err);
            res.status(500).json({ error: 'Error al crear el pedido.', details: err });
            return;
        }
        newPedido.id = result.insertId;
        res.status(201).json(newPedido);
    });
};

// Actualizar un pedido por ID
const updatePedido = (req, res) => {
    const pedidoId = req.params.id;
    const { nombreCliente, emailCliente, precioTotal, entregado, producto_id,combo_id } = req.body;

    const updatePedido = {
        nombreCliente,
        emailCliente,
        precioTotal,
        entregado,
        producto_id,
        combo_id

    };

    connection.query('UPDATE pedido SET ? WHERE id = ?', [updatePedido, pedidoId], (err, result) => {
        if (err) {
            console.error('Error al actualizar el pedido:', err);
            res.status(500).json({ error: 'Error al actualizar el pedido.', details: err });
            return;
        }
        res.json(updatePedido);
    });
};

// Eliminar un pedido por ID
const deletePedido = (req, res) => {
    const pedidoId = req.params.id;
    connection.query('DELETE FROM pedido WHERE id = ?', [pedidoId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el pedido:', err);
            res.status(500).json({ error: 'Error al eliminar el pedido.', details: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        } else {
            res.json({ message: 'Pedido eliminado exitosamente.' });
        }
    });
};

module.exports = {
    getAllPedido,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
};
