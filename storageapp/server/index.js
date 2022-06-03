const express = require("express");
const config = require("./config");

// Import routes
const files = require("./routes/files");
const users = require("./routes/users");

// set up express app
const app = express();

// middlewares
app.use(express.json());

// use routers
files(app);
users(app);

app.get("/", (req, res) => {
    return res.json({
        message: "hola mundo",
    });
});

app.listen(config.port, () => {
    console.log(`Listenging on http://localhost:${config.port}`);
});
