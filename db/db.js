const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-giselaurriza.alwaysdata.net', // host de AlwaysData
    port: 3306, 
    user: '362671_admin', //  usuario de AlwaysData
    password: 'RuloLoco1980.', //  contraseña de AlwaysData
    database: 'giselaurriza_foodies' // El nombre de base de datos en AlwaysData
});
db.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log(' Conectado a la base de datos.')

    db.query('CREATE DATABASE IF NOT EXISTS giselaurriza_foodies',(err, results)=>{
        if(err){
            console.error('Error creando la base de datos',err);
            return;
        }
        console.log('Base de datos creada');

        db.changeUser({database:'giselaurriza_foodies'},(err)=>{
            if(err){
                console.error('Error cambiando a gisela_urriza_foodies',err);
                return;
            }
            // CREACIÓN TABLA PRODUCTO
            const createProductTableQuery =`
                CREATE TABLE IF NOT EXISTS producto(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    descripcion TEXT,
                    precio DECIMAL(10, 2) NOT NULL,
                    stock TINYINT NOT NULL
                );
            `;
            db.query(createProductTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos Producto',err);
                    return;
                }
                console.log('Tabla Producto creada');
            });
            // CREACIÓN TABLA USUARIO
            const createUserTableQuery =`
                CREATE TABLE IF NOT EXISTS usuario(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    estado TINYINT NOT NULL
                );
            `;
            db.query(createUserTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos Usuario',err);
                    return;
                }
                console.log('Tabla Usuario creada');
            });
            // CREACIÓN TABLA PEDIDO
            const createTicketTableQuery =`
                CREATE TABLE IF NOT EXISTS pedido(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombreCliente VARCHAR(255) NOT NULL,
                    emailCliente VARCHAR(255) NOT NULL,
                    precioTotal DECIMAL(10, 2) NOT NULL,
                    entregado TINYINT NOT NULL
                );
            `;
            db.query(createTicketTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos Pedido',err);
                    return;
                }
                console.log('Tabla Pedido creada');
            });
            // CREACIÓN TABLA IMAGENES
            const createImagesTableQuery =`
                CREATE TABLE IF NOT EXISTS imagen(
                    imagen_id INT AUTO_INCREMENT PRIMARY KEY,
                    seccion VARCHAR(255), #puede ser producto o combo
                    url VARCHAR(255) NOT NULL
                );
            `;
            db.query(createImagesTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos imagen',err);
                    return;
                }
                console.log('Tabla Imagen creada');
            });            
            // CREACIÓN TABLA INTERMEDIA PRODUCTO_TIENE_IMAGENES
            const createProduct_has_imageTableQuery =`
                CREATE TABLE IF NOT EXISTS producto_tiene_imagen(
                    producto_id INT NOT NULL,
                    imagen_id INT,
                    PRIMARY KEY (producto_id, imagen_id),
                    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(id), 
                    FOREIGN KEY (imagen_id) REFERENCES IMAGEN(imagen_id) 
                );
            `;
            db.query(createImagesTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos producto_tiene_imagen',err);
                    return;
                }
                console.log('Tabla producto_tiene_imagen creada');
            });  
            // CREACIÓN TABLA INTERMEDIA PEDIDO_TIENE_PRODUCTO
            const createPedido_tiene_productoTableQuery =`
                CREATE TABLE IF NOT EXISTS pedido_tiene_producto(
                    pedido_id INT NOT NULL,
                    producto_id INT,
                    PRIMARY KEY (pedido_id, producto_id),
                    FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id),
                    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(id)
                );
            `;
            db.query(createImagesTableQuery,(err,results) => {
                if (err){
                    console.error('Error creando base de datos pedido_tiene_producto',err);
                    return;
                }
                console.log('Tabla pedido_tiene_producto creada');
            }); 
        });
    }); 
});
module.exports = db;