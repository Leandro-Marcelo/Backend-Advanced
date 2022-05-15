const express = require("express");

const app = express();

//Mongoose
// uri: mongodb://mongo:27017/ myDB)
// ¿Por qué mongo y no localhost? Lo que hace Docker es generar una tabla de dns y en lugar de trabajar con la direccion IP y a lo mejor el nombre del servicio, ya le asigna un nombre entonces en lugar de poner localhost simplemente se pone mongo y ya

app.get("/", (req, res) => {
    return res.send("<h1>Hola mundo</h1>");
});

app.get("/contacto", (req, res) => {
    return res.json({
        nombre: "Leandro",
        correo: "leandro@gmail.com",
    });
});

app.listen(4000, () => {
    console.log("Escuchando en: http://localhost:4000");
});
