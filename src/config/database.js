const mongoose = require("mongoose");

async function connection() {
    const conn = await mongoose.connect(
        "mongodb+srv://atabase?retryWrites=true&w=majority"
    ); // esta uri esta configurada para utilizar la base de datos que tenemos en nuestro docker compose, si queremos utilizar un cluster que tenemos tendríamos que cambiar esta uri. Se pone mongo porque así se llama mi servicio, el nombre del contenedor puede ir variando en este caso tambien le puse mongo y bueno la imagen si o si debe ser mongo porque es la imagen oficial
    console.log(conn.connection.host);
    console.log("Connection established...");
}

module.exports = { mongoose, connection };
