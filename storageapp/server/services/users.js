const client = require("../libs/singletonPrisma");

class Users {
    async getUser() {
        try {
            const usersCreated = await client.user.findMany();

            return { success: true, data: usersCreated };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error getting users" };
        }
    }

    async createUser(data) {
        try {
            const userCreated = await client.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    active: true,
                },
            });

            return { success: true, data: userCreated };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error creating user" };
        }
    }

    async updateUser(data) {
        const algo = await client.user.update();
    }
}

module.exports = Users;
