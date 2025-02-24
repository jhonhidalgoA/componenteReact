const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginpython'
})

// Ruta para validar el usuario
app.post('/login', (req, res) =>{
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length >0){
            res.json({success: true , message: 'Inicio de sesión exitoso'});
        }else{
            res.status(401).json({success: false, message: 'Credenciales incorrectas'});
        }
        });       
    
});


// Inicia el servidor en el puerto 5000
app.listen (5000, () => {
    console.log("Servidor corriendo en http://localhost:5000");
})
