const { uploadFile, uploadFiles } = require("../libs/storage");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

class Files {
    async uploadMany(files) {
        const responseUploadFiles = await uploadFiles(files);

        const result = responseUploadFiles.forEach(async (file) => {
            // podríamos utilizar el file.value.success ó file.status ó file.status === "fulfilled"
            if (file.value.success) {
                const fileCreated = await client.file.create({
                    data: {
                        originalName: file.value.originalName,
                        fileName: file.value.fileName,
                    },
                    // falta agregar usuario
                });
            }
        });

        return result;
    }
}

module.exports = Files;
