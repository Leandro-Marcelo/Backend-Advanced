const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const bcrypt = require("bcrypt");
const UserService = require("./users");
const { uploadFiles } = require("../libs/storage");
const { rolesAuth } = require("../helpers/enum/auth");

class Auth {
    /*     constructor() {
        this.users = new UserService();
    } */

    /* ********************************************** Utilities *************************************************** */

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    getToken(user) {
        const sessionTokenData = {
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            // la foto de perfil del usuario igual lo guardo en su carpeta que le creamos po no?
            /*  fileName: user?.fileName, */
            name: user.name,
            /* profilePicture: user?.profilePicture, */
            /* roles: user.roles, */
            rol: user.rol,
            /* updatedAt: user.updatedAt, */
        };

        // No retorno un success porque se supone que siempre va a salir bien, si el sign podría salir mal, puedo agregarle un try catch y retornar falso en caso de error
        const sessionToken = jwt.sign(sessionTokenData, jwtSecret, {
            expiresIn: "1d",
        });

        return { sessionTokenData, sessionToken };
    }

    /* ************************************************ Service *************************************************** */

    async login(userData) {
        if (!userData.email || !userData.password) {
            return {
                success: false,
                message: "Email and password are required.",
            };
        }
        const userService = new UserService();
        const responseGetByFilter = await userService.getByFilter({
            email: userData.email,
        });

        if (!responseGetByFilter.success) return responseGetByFilter;
        if (!responseGetByFilter.data) {
            return {
                succes: false,
                message: "The account does not exist.",
            };
        }

        const match = await bcrypt.compare(
            userData.password,
            responseGetByFilter.data.password
        );

        if (!match) {
            return {
                success: false,
                message: "Incorrect credentials.",
            };
        }

        const responseGetToken = await this.getToken(responseGetByFilter.data);
        return {
            success: true,
            data: {
                action: "login",
                sessionTokenData: responseGetToken.sessionTokenData,
                sessionToken: responseGetToken.sessionToken,
            },
        };
    }

    async signup(file, userData, userType) {
        if (
            !userData.email ||
            !userData.password ||
            !userData.name ||
            !userType
        ) {
            return {
                success: false,
                message: "Name, email, password and userType are required.",
            };
        }

        if (userData.name.length > 12) {
            return {
                success: false,
                message: "Name must be less than 12 characters.",
            };
        }

        const userService = new UserService();
        const responseGetByFilter = await userService.getByFilter({
            email: userData.email,
        });
        console.log(responseGetByFilter);

        if (!responseGetByFilter.success) return responseGetByFilter;
        if (responseGetByFilter.data) {
            return {
                succes: false,
                message: "This email already has an account",
            };
        }

        userData.password = await this.hashPassword(userData.password);

        const role = rolesAuth[userType];

        const newUser = {
            ...userData,
            role,
        };
        /* create({anything:"anything"} => Error creating user ) */
        const responseCreateUser = await userService.createUser(newUser);
        if (!responseCreateUser.success) return responseCreateUser;
        const responseGetToken = await this.getToken(responseCreateUser.data);

        return {
            success: true,
            data: {
                action: "signup",
                sessionTokenData: responseGetToken.sessionTokenData,
                sessionToken: responseGetToken.sessionToken,
            },
        };
    }
}

module.exports = Auth;
