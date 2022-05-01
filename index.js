const express = require("express");

const app = express();

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
