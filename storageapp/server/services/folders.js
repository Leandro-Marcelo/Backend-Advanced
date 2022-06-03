const client = require("../libs/singletonPrisma");

class Folders {
    async getMyFolders(currentUser) {
        // Obteniendo los folders y los file de mi raiz
        try {
            const folders = await client.folder.findMany({
                where: {
                    parentFolderId: null,
                    userId: currentUser.id,
                },
            });
            // aquí no haría falta traer el servicio de file porque ya podemos acceder a los metodos del ORM mediante el client
            const files = await client.file.findMany({
                where: {
                    folderId: null,
                    userId: currentUser.id,
                },
            });

            return {
                success: true,
                data: { folders, files },
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Error getting folders",
            };
        }
    }

    async createFolder(currentUser, originalName, parentFolderId) {
        let data;
        if (parentFolderId) {
            data = {
                originalName,
                user: {
                    connect: {
                        id: Number.parseInt(currentUser.id),
                    },
                },
                parentFolder: {
                    connect: {
                        id: parentFolderId,
                    },
                },
            };
        } else {
            data = {
                originalName,
                user: {
                    connect: {
                        id: Number.parseInt(currentUser.id),
                    },
                },
            };
        }
        try {
            const folder = await client.folder.create({
                data,
            });
            return {
                success: true,
                data: folder,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Error creating folder",
            };
        }
    }
}

module.exports = Folders;
