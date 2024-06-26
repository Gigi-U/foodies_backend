const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-giselaurriza.alwaysdata.net',
    port: 3306,
    user: '362671_admin',
    password: 'RuloLoco1980.',
    database: 'giselaurriza_foodies'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos.');

    db.query('CREATE DATABASE IF NOT EXISTS giselaurriza_foodies', (err, results) => {
        if (err) {
            console.error('Error creando la base de datos', err);
            return;
        }
        console.log('Base de datos creada');

        db.changeUser({ database: 'giselaurriza_foodies' }, (err) => {
            if (err) {
                console.error('Error cambiando a giselaurriza_foodies', err);
                return;
            }

/*
            // CREACIÓN TABLA PRODUCTO
            const createProductTableQuery = `
                CREATE TABLE IF NOT EXISTS producto(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    descripcion VARCHAR(255),
                    precio DECIMAL(10, 2) NOT NULL,
                    stock TINYINT NOT NULL
                );
            `;
            db.query(createProductTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creando tabla Producto', err);
                    return;
                }
                console.log('Tabla Producto creada');
            });

            // CREACIÓN TABLA USUARIO
            const createUserTableQuery = `
                CREATE TABLE IF NOT EXISTS usuario(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    estado TINYINT NOT NULL
                );
            `;
            db.query(createUserTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creando tabla Usuario', err);
                    return;
                }
                console.log('Tabla Usuario creada');
            });

            // CREACIÓN TABLA PEDIDO
            const createTicketTableQuery = `
                CREATE TABLE IF NOT EXISTS pedido(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre_cliente VARCHAR(255) NOT NULL,
                    email_cliente VARCHAR(255) NOT NULL,
                    precio_total DECIMAL(10, 2) NOT NULL,
                    entregado TINYINT NOT NULL,
                    productos JSON NOT NULL
                );
            `;
            db.query(createTicketTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creando tabla Pedido', err);
                    return;
                }
                console.log('Tabla Pedido creada');
            });

            // CREACIÓN TABLA IMAGENES
            const createImagesTableQuery = `
                CREATE TABLE IF NOT EXISTS imagen(
                    imagen_id INT AUTO_INCREMENT PRIMARY KEY,
                    seccion VARCHAR(255), --  producto, combo o lo que sea
                    url VARCHAR(255) NOT NULL
                );
            `;
            db.query(createImagesTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creando tabla Imagen', err);
                    return;
                }
                console.log('Tabla Imagen creada');
            });

             // CREACIÓN TABLA COMBO - si lo llegamos a usar
            const createComboTableQuery = `
                CREATE TABLE IF NOT EXISTS combo(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    descripcion VARCHAR(255),
                    precio DOUBLE(10, 2) NOT NULL,
                );
            `;
            db.query(createComboTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creando tabla Combo', err);
                    return;
                }
                console.log('Tabla Combo creada');
            }); */
        });
    });
});

module.exports = db;