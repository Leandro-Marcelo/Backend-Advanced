const express = require("express");
const UserService = require("../services/users");

function users(app) {
    const router = express.Router();
    const userService = new UserService();

    app.use("/api/users", router);

    router.get("/", async (req, res) => {
        const response = await userService.getUser();
        return res.status(response.success ? 200 : 400).json(response);
    });

    router.post("/", async (req, res) => {
        const response = await userService.createUser(req.body);
        return res.status(response.success ? 200 : 400).json(response);
    });
}

module.exports = users;
