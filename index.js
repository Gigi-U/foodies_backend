const express = require('express');
const app = express();

app.get('/',()=>{
    res.send('Foodies Deploy')
})
// no siempre sabemos si el servidor va a tener el puerto 3000 disponible para eso tengo que preguntarle. (o el puerto del swervidor o sino dejar 3000)
//const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));
