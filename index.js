// index.js
const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos.router');

app.use(express.json());

app.use("/productos", productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
