function addCookie(res, instruction) {
    res.cookie("sessionToken", instruction.sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
    })
        .status(200)
        .json({ success: true, data: instruction.sessionTokenData });
}

function createTeam(res, { sessionToken, sessionTokenData }) {
    res.clearCookie("sessionToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        //maxAge: 24 * 60 * 60 * 1000,
    });
    return res
        .cookie("sessionToken", sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ success: true, data: sessionTokenData });
}

// login and sign up
function loginSignUp(res, instruction) {
    let date = new Date(new Date().setDate(new Date().getDate() + 7));
    return res
        .cookie("sessionToken", instruction.sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            /* maxAge: 24 * 60 * 60 * 1000, */
            expires: date,
        })
        .status(200)
        .json({ success: true, data: instruction.sessionTokenData });
}

function clearCookie(res) {
    res.clearCookie("sessionToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        //maxAge: 24 * 60 * 60 * 1000,
    });
}

function logout(res) {
    return (
        res
            .clearCookie("sessionToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                //maxAge: 24 * 60 * 60 * 1000,
            })
            // maybe return user data void
            .json({ success: true })
    );
}

function handleTokenToCookie(res, response) {
    if (!response.success)
        return res
            .status(400)
            .json({ success: response.success, message: response.message });

    /* ************************************************ Auth *************************************************** */

    if (response.data.action === "login" || response.data.action === "signup") {
        loginSignUp(res, response.data);
    }

    if (response.data.action === "logout") {
        logout(res);
    }

    /* ************************************************ Team *************************************************** */

    if (response.data.action === "createTeam") {
        createTeam(res);
    }
}

module.exports = handleTokenToCookie;
