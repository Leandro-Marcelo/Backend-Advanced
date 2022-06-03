const { uploadFile, uploadFiles } = require("../libs/storage");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

class Files {
    async uploadMany(files, userId) {
        const responseUploadFiles = await uploadFiles(files);

        const filesUploaded = responseUploadFiles.map(async (file) => {
            // podríamos utilizar el file.value.success ó file.status ó file.status === "fulfilled"
            if (file.value.success) {
                const fileCreated = await client.file.create({
                    data: {
                        originalName: file.value.originalName,
                        fileName: file.value.fileName,
                        // userId, esto sería una solución, aunque la forma correcta que recomienda prisma es user {connect{id}} y con esto ya añadiría la propiedad userId al registro
                        user: {
                            connect: {
                                id: Number.parseInt(userId),
                            },
                        },
                    },
                });
                return { success: true, file: fileCreated };
            }
            return { success: false, message: "Error uploading this file" };
        });

        return {
            success: true,
            data: (await Promise.allSettled(filesUploaded)).map(
                (file) => file.value
            ),
        };
    }
}

module.exports = Files;
