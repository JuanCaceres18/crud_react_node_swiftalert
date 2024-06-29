const express = require("express"); // Incluyo el módulo Express
const mysql = require("mysql2"); // Importar MySQL
const app = express(); // Creo una aplicación de Express

// Crear conexión a base de datos
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: 'productos_tienda_db'
});

// Conectarse a la base de datos
con.connect( function (err) {
    if (err) throw err;
    console.log("Connected!");
})


// Ruta - petición GET
app.get(("/"), function(req,res) {
    // Mostrar productos
    const sql = "SELECT * FROM productos";
    con.query(sql, function(err, result, fields){
        if (err) throw err;
        res.send(result);
    });
});

// Ruta - petición POST
app.post("/create", function(req, res){
    // Agregar productos
    const sql = "INSERT INTO productos (nombre, categoria, descripcion, precio) VALUES ?";
    values = [
            ['Mueble', 'mobiliario','.',1700],
            ['mascarilla', 'makeup','anti puntos negros',120],
            ['smartphone', 'electrónico','Smartphone ZS',3000]
        ]
    con.query(sql, [values], function (err, result){
        if (err) throw err;
        res.send("Filas afectadas: " + result.affectedRows);
    });
})

// Con esta línea se crea el servidor
app.listen(3000, function(){
    console.log("Escuchando el puerto 3000");
})