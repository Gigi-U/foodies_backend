const Producto = require('../models/Producto');
const productos = require('../data/productos.json'); // json previo a la conexion con la base de datos

class ProductoController {
    // Obtengo todos los productos
    consultarTodos(req, res) {
        res.json(productos);
    }

    // Obtengo producto por ID
    consultarPorId(req, res) {
        const { id } = req.params;
        const producto = productos.find(p => p.id === parseInt(id));
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    }

    // Agrego nuevo producto
    altaProducto(req, res) {
        const { nombre, descripcion, precio, stock } = req.body;
        const nuevoProducto = new Producto(
            productos.length + 1,
            nombre,
            descripcion,
            precio,
            stock
        );
        productos.push(nuevoProducto);
        res.status(201).json({
            mensaje: "Producto agregado correctamente",
            producto: nuevoProducto
        });
    }

    // Modifico producto por ID
    modificarProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;
        let producto = productos.find(p => p.id === parseInt(id));
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.stock = stock;
        res.json({
            mensaje: `Producto modificado correctamente`,
            producto
        });
    }

    // Elimino producto por ID
    eliminarProducto(req, res) {
        const { id } = req.params;
        const index = productos.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        productos.splice(index, 1);
        res.json({
            mensaje: `Producto eliminado correctamente`,
            id: parseInt(id)
        });
    }
}

module.exports = new ProductoController();
