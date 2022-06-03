// ...allowedRoles = (5150, 1984, 2001)
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles)
            return res
                .status(401)
                .json({ message: "The user does not have roles" });
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((values) => values === true);

        if (!result)
            return res.status(401).json({
                message:
                    "The user does not have the authorization to access this endpoint",
            });
        next();
    };
};

module.exports = { verifyRoles };
