const express = require("express");
const { verifyJWT } = require("../middleware/verifyJWT");
const Auth = require("../services/auth");
const handleTokenToCookie = require("../helpers/cookieParser/handleTokenToCookie");
const upload = require("../middleware/uploadFile");

function auth(app) {
    const router = express.Router();
    const authService = new Auth();
    app.use("/api/auth", router);

    router.get("/logout", (req, res) => {
        const response = {
            success: true,
            data: {
                action: "logout",
            },
        };
        return handleTokenToCookie(res, response);
    });

    router.get("/validate", verifyJWT, (req, res) => {
        const { currentUser } = req;
        return res.status(200).json({ success: true, data: currentUser });
    });

    router.post("/login", async (req, res) => {
        const { body: userData } = req;
        const response = await authService.login(userData);

        return handleTokenToCookie(res, response);
    });

    router.post(
        "/signup",
        upload.single("profilePicture"),
        async (req, res) => {
            const {
                body: { userType, ...userData },
                file,
            } = req;
            const response = await authService.signup(file, userData, userType);

            return handleTokenToCookie(res, response);
        }
    );
}

module.exports = auth;
