// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos.router');
const usuariosRoutes = require('./routes/usuarios.router');

//Middlewares
//app.use(express.json());
app.use(bodyParser.json());
 app.use(cors());

 //Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.post("/usuarios/validarInicioSesion", usuariosRoutes);

app.get("/", (req, res) => {
    res.send("Vamos Foodies!");
  });

app.get('/api/datos', (req, res) => {
  res.json({ message: 'Datos desde el backend' });
});


  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
