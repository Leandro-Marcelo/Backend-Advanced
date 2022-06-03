const { uploadFile, uploadFiles, deleteFile } = require("../libs/storage");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

class Files {
    async getAll() {
        const files = await client.file.findMany();

        return files;
    }

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

    async deleteMany(files) {
        const filesDeleted = files.map(async (file) => {
            const responseDeleteFile = await deleteFile(file);
            if (responseDeleteFile.success) {
                try {
                    const fileDeleted = await client.file.delete({
                        /* al momento de eliminar utilizando utilizando el metodo de delete, al where necesitamos pasarle como argumento un field de tipo unique, como el fileName va a ser unique por el uuid que le agregamos, entonces voy a modificar el modelo de la base de datos diciendo que fileName debe ser unique. Otra posible solución sería utilizar el metodo deleteMany y ya no haría falta modificar la base de datos haciendolo unique el field fileName*/
                        where: {
                            fileName: responseDeleteFile.fileName,
                        },
                    });

                    return {
                        success: true,
                        file: fileDeleted,
                    };
                } catch (error) {
                    console.log(error);
                    return {
                        success: false,
                        message:
                            "File deleted, error deleting this file in database",
                    };
                }
            } else {
                return responseDeleteFile;
            }
        });

        return {
            success: true,
            data: (await Promise.allSettled(filesDeleted)).map(
                (file) => file.value
            ),
        };
    }
}

module.exports = Files;
