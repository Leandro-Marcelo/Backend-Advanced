require("dotenv").config();

const config = {
    /* ********************************* Ports *******************************/
    port: process.env.PORT,

    /* ********************************* JWT / Tokens *******************************/
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

    /* *********************************** Files *******************************/
    bucketName: process.env.BUCKET_NAME,
};

/* console.log(config); */
module.exports = config;
