function tokenToCookie(res, response) {
    if (!response.success)
        return res
            .status(400)
            .json({ success: response.success, message: response.message });

    return res
        .cookie("jwt", response.token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ success: response.success, data: response.data });
}

module.exports = tokenToCookie;

/* 
function tokenToCookie(res, response) {
    if (response.success) {
        let date = new Date(new Date().setDate(new Date().getDate() + 7));
        return res
            .cookie("token", response.token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                expires: date,
            })
            .status(200)
            .json({ success: response.success, data: response.data });
    }

    return res
        .status(400)
        .json({ success: response.success, message: response.message });
}

module.exports = tokenToCookie;

*/
