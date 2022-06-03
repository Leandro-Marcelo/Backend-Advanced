const express = require("express");
const config = require("./config");

// Importacion de rutas
const files = require("./routes/files");

const app = express();

// uso de rutas
files(app);

app.get("/", (req, res) => {
    return res.json({
        message: "hola mundo",
    });
});

app.listen(config.port, () => {
    console.log(`Listenging on http://localhost:${config.port}`);
});
