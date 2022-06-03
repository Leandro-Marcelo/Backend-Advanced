const express = require("express");
const FolderService = require("../services/folders");
const { verifyJWT } = require("../middleware/verifyJWT");

function folders(app) {
    const router = express.Router();
    const folderService = new FolderService();

    app.use("/api/folders", router);

    router.get("/myFolders", verifyJWT, async (req, res) => {
        const { currentUser } = req;

        const result = await folderService.getMyFolders(currentUser);

        return res.status(result.success ? 200 : 400).json(result);
    });

    router.post("/create", verifyJWT, async (req, res) => {
        const {
            currentUser,
            body: { originalName, parentFolderId },
        } = req;
        const result = await folderService.createFolder(
            currentUser,
            originalName,
            parentFolderId
        );

        return res.status(result.success ? 200 : 400).json(result);
    });
}

module.exports = folders;
