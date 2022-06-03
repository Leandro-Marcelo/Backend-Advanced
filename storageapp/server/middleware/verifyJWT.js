const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// 1

// verifyJWT = decodedToken
const verifyJWT = (req, res, next) => {
    /*  req.neededRole = 30; */
    verifyToken(req, res, next);
};

// 2
const verifyToken = (req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies.sessionToken) {
        return res.status(403).json({
            status: "No-Auth",
            message: "A token is required for this process",
        });
    }

    handleToken(cookies.sessionToken, req, res, next);
};

// 3
const handleToken = (sessionToken, req, res, next) => {
    try {
        const decoded = jwt.verify(sessionToken, jwtSecret);
        req.currentUser = decoded;
        return next();
        /* //validateRole(req, res, next); */
    } catch (error) {
        return res.status(403).json({
            status: "Expired",
            message: "A valid token is required for this process",
        });
    }
};

/* // 4
const validateRole = (req, res, next) => {
    if (req.user.role >= req.neededRole) {
        return next();
    }

    return res.status(403).json({
        status: "Insuficient permissions",
        message: "A superior role is required for this action",
    });
}; */

module.exports = {
    verifyJWT,
};
