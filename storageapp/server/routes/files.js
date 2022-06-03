const express = require("express");
const FileService = require("../services/files");
const upload = require("../middleware/uploadFile");

function files(app) {
    const router = express.Router();
    const fileService = new FileService();

    app.use("/api/files", router);

    router.get("/", async (req, res) => {
        const files = await fileService.getFiles();

        return res.json(files);
    });

    router.get("/:fileName", async (req, res) => {
        const { fileName } = req.params;

        const response = await fileService.getFile(fileName, res);
        if (response.success) {
            // to close the response
            return res.end();
        }
        // normallly we would return a status code 404
        return res.status(404).json(response);
    });

    // upload.array("files") para recibir varios archivos (se debe de enviar en form-data y en campos llamado files y multer los almacenará en req.files), upload.single("file") para recibir un solo archivo (se debe de enviar en form-data y en un campo llamado file y multer lo almacenará en req.file), upload.any() para recibir varios archivos (se debe de enviar en form-data y no debemos enviarlo con un campo en específico, ya que lo almacenará en req.files por defecto), upload.fields() Accept a mix of files, specified by fields. An object with arrays of files will be stored in req.files. More in documentation.

    // OKEY GITHUB COPILOT: upload.fields para recibir varios campos, upload.fields.files para recibir varios campos y archivos, upload.fields.files para recibir un solo campo y un solo archivo, upload.fields.files para recibir un solo campo y varios archivos, upload.fields.files para recibir varios campos y un solo archivo, upload.fields.files para recibir varios campos y varios archivos

    router.post("/upload", upload.array("files"), async (req, res) => {
        const { files } = req;
        /* 
         console.log(files);
{
    fieldname: 'files',
    originalname: '6cfbfd73-d3ad-4230-9ed9-13e58e5858d8.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    // cada valor es un chunk el cual esta en hexadecimal y todo ese string estaba almacenado en un buffer (porque segun tzuzul debería retirarse de la memoria ram)
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 06 06 06 06 07 06 07 08 08 07 0a 0b 0a 0b 0a 0f 0e 0c 0c 0e 0f 16 10 11 10 ... 121089 more bytes>,
    size: 121139
}, */
        const response = await fileService.uploadMany(files, req.body.id);
        console.log(response);
        return res.status(response.success ? 200 : 400).json(response);
    });

    /* router.delete(/:fileId) esto si es que queremos eliminar un archivo, /delete para recibir en el body todos los file que quiere eliminar */
    router.delete("/delete", async (req, res) => {
        const { files } = req.body;

        const result = await fileService.deleteMany(files);

        return res.json(result);
    });
}

module.exports = files;
