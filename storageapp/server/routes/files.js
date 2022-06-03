const express = require("express");
const uploadFiles = require("../libs/storage");
const uploadFile = require("../middleware/uploadFile");

function files(app) {
    const router = express.Router();

    app.use("/api/files", router);

    // uploadFile.array("files") para recibir varios archivos (se debe de enviar en form-data y en campos llamado files y multer los almacenará en req.files), uploadFile.single("file") para recibir un solo archivo (se debe de enviar en form-data y en un campo llamado file y multer lo almacenará en req.file), uploadFile.any() para recibir varios archivos (se debe de enviar en form-data y no debemos enviarlo con un campo en específico, ya que lo almacenará en req.files por defecto), uploadFile.fields() Accept a mix of files, specified by fields. An object with arrays of files will be stored in req.files. More in documentation.

    // OKEY GITHUB COPILOT: uploadFile.fields para recibir varios campos, uploadFile.fields.files para recibir varios campos y archivos, uploadFile.fields.files para recibir un solo campo y un solo archivo, uploadFile.fields.files para recibir un solo campo y varios archivos, uploadFile.fields.files para recibir varios campos y un solo archivo, uploadFile.fields.files para recibir varios campos y varios archivos

    router.post("/upload", uploadFile.array("files"), (req, res) => {
        uploadFiles(req.files);

        /* 
{
    fieldname: 'files',
    originalname: '6cfbfd73-d3ad-4230-9ed9-13e58e5858d8.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    // cada valor es un chunk el cual esta en hexadecimal y todo ese string estaba almacenado en un buffer (porque segun tzuzul debería retirarse de la memoria ram)
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 06 06 06 06 07 06 07 08 08 07 0a 0b 0a 0b 0a 0f 0e 0c 0c 0e 0f 16 10 11 10 ... 121089 more bytes>,
    size: 121139
}, */

        return res.json({
            success: true,
            message: "Upload successful",
        });
    });
}

module.exports = files;
