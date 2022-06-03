const express = require("express");
const { connection } = require("./config/database");
const UserModel = require("./models/user");
const app = express();

//Mongoose
// uri: mongodb://mongo:27017/ myDB)
// ¿Por qué mongo y no localhost? Lo que hace Docker es generar una tabla de dns y en lugar de trabajar con la direccion IP y a lo mejor el nombre del servicio, ya le asigna un nombre entonces en lugar de poner localhost simplemente se pone mongo y ya
connection();

app.get("/", async (req, res) => {
    return res.json({
        nombre: "1111",
        correo: "1",
        telefono: "1ununu",
        casa: "1aaaa",
    });
});
app.get("/xd", async (req, res) => {
    const users = await UserModel.find();
    return res.json(users);
});

app.get("/contact", (req, res) => {
    return res.json({
        nombre: "Leandro",
        correo: "leandro@gmail.com",
        telefono: "99787ddsadasdsdadsa",
        casa: "cas11aaaaaas11a",
    });
});

app.listen(4000, () => {
    console.log("Escuchando en: http://localhost:4000");
});
