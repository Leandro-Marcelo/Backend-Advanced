require("dotenv").config();

const config = {
    /* ********************************* Ports *******************************/
    port: process.env.PORT,

    /* ********************************* JWT / Tokens *******************************/
    jwtSecret: process.env.JWT_SECRET,

    /* *********************************** Files *******************************/
    bucketName: process.env.BUCKET_NAME,
};

/* console.log(config); */
module.exports = config;
