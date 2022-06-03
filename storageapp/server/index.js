const express = require("express");
const config = require("./config");
const cors = require("cors");
const cookies = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

// Import routes
const auth = require("./routes/auth");
const files = require("./routes/files");
const folders = require("./routes/folders");
const users = require("./routes/users");

// set up express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookies());

// use routers
auth(app);
files(app);
folders(app);
users(app);

app.get("/", (req, res, next) => {
    return res.status(200).json({ lean: "leandro" });
});

app.listen(config.port, () => {
    console.log("Mode:", process.env.NODE_ENV);
    console.log("listening on: http://localhost:" + config.port);
});
