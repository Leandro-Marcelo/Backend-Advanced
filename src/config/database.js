const mongoose = require("mongoose");

async function connection() {
    const conn = await mongoose.connect("mongodb://mongo/myDB"); // esta uri esta configurada para utilizar la base de datos que tenemos en nuestro docker compose, si queremos utilizar un cluster que tenemos tendríamos que cambiar esta uri. Sepone mongo porque así se llama mi servicio, el nombre del contenedor puede ir variando en este caso tambien le puse mongo y bueno la imagen si o si debe ser mongo porque es la imagen oficial
    console.log(conn);
    console.log("Connection established...");
}

module.exports = { mongoose, connection };
