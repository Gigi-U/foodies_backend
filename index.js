
require("dotenv").config(); // NUEVO QUE HICE

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productosRoutes = require('./routes/productos.router');
const usuariosRoutes = require('./routes/usuarios.router');
const imagenesRoutes = require('./routes/imagenes.router');
const pedidosRoutes = require('./routes/pedidos.router');
const authRoutes = require('./routes/auth.router'); //NUEVO Q HICE

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/imagenes',imagenesRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/auth' , authRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a Foodies Backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
