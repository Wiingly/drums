const { findByFilter } = require("../users/model");

const checkLoginCredentials = (req, res, next) => {
    const { username, password } = req.body;
    if (
        !username ||
        !password ||
        username === '' ||
        password === '') {
        next({ message: "Please provide a username and password", status: 400 });
    }
    else {
        next();
    }
};

const checkUsernameUnique = async (req, res, next) => {
    const { username } = req.body;
    const existingUsername = await findByFilter({ username });
    if (existingUsername) {
        next({ message: `${username} already exists.`, status: 400 });
    } else {
        next();
    }
};

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body;
    const user = await findByFilter({ username });
    if (!user) {
        next({ message: "Invalid credentials", status: 401 });
    } else {
        req.body.user = user;
        next();
    }
};

const checkNewUserPayload = (req, res, next) => {
    const { username, password } = req.body;
    switch (true) {
        case (!username || !username.match(/^\S+@\S+\.\S+$/)):
            next({ message: "Please provide a valid username.", status: 400 });
            break;
        case (!password || password.length < 8):
            next({ message: "Please provide a valid password.", status: 400 });
            break;
        default:
            next();
    }
};

const formatNewUserPayload = (req, res, next) => {
    const { username, password } = req.body;
    req.body.username = username.trim();
    req.body.password = password.trim();
    next();
};



module.exports = {
    checkLoginCredentials,
    checkUsernameUnique,
    checkUsernameExists,
    checkNewUserPayload,
    formatNewUserPayload,
};