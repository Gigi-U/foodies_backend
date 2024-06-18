// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos.router');

//app.use(express.json());
app.use(bodyParser.json());

app.use("/productos", productosRoutes);

app.get("/", (req, res) => {
    res.send("Vamos Foodies!");
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
