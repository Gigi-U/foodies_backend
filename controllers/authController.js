const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../db/db');

const usuario = require("../models/usuario");

class AuthController {
    // Obtengo todos los auth
    consultarTodos(req, res) {
      const sql = 'SELECT * FROM auth';
      db.query(sql, (err, auth) => {
          if (err) {
              console.error('Error ejecutando la consulta', err);
              res.status(500).json({ error: 'Error ejecutando la consulta' });
              return;
          }
          res.json(auth);
      });
  }




  altaUsuario = (req, res) => {
    const { nombre, password,estado } = req.body;

    const hash = bcrypt.hashSync(password, 8);

    // Crear el objeto de usuario con la contraseña hasheada
    const user = {nombre, password: hash, estado };

 // Guardar el usuario en la base de datos (ejemplo MySQL)
 db.query('INSERT INTO auth SET ?', user, (err, result) => {
  if (err) {
    console.error("Error al insertar usuario:", err);
    return res.status(500).send("Error interno al crear usuario");
  }

  // Obtener el ID del usuario insertado
  const userId = Date.now();

  // Generar el token JWT
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1h" });

  // Devolver la respuesta con el token generado
  res.status(201).send({ auth: true, token });
});
};


login = (req, res) => {
  const { nombre, password } = req.body;
  // Buscar el usuario en la base de datos por nombre
  db.query('SELECT * FROM auth WHERE nombre = ?', nombre, (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).send("Error interno al intentar iniciar sesión");
    }

    if (results.length === 0) {
      return res.status(404).send("Usuario o contraseña invalido");
    }

    const usuario = results[0]; // Tomamos el primer resultado

    // Verificar la contraseña
    const passwordIsValid = bcrypt.compareSync(password, usuario.password);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).send({ auth: true, token });
  });
};
}

const authController = new AuthController();

module.exports = authController;