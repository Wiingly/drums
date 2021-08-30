const { findByFilter } = require("../users/model");
const { findUserWingsByWingsID } = require('../wings/model');

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
        case (!username):
            next({ message: "Please provide a valid username.", status: 400 });
            break;
        case (!password || password.length < 1):
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

const checkNewWingPayload = (req, res, next) => {
    const { flavor, amount, location } = req.body;
    if (!location) {
        next({status: 400, message: "man i just know you ate them somewhere"});
    } else if (!flavor) {
        next({ status: 400, message: 'even if you`re a maniac and ate them plain can you at least put that' });
    } else if (flavor.length > 255) {
        next({ status: 400, message: 'bruh cmon ik theres no wing flavor that long' });
    } else if (!amount) {
        next({ status: 400, message: 'you ate zero wings????' });
    } else if (typeof amount !== 'number') {
        next({ status: 400, message: 'numbers only you little typing dork' });
    } else {
        req.body.flavor = flavor.trim();
        req.body.location = location.trim();
        req.body.amount = amount;
        next();
    }
};

const checkUserWingExists = async (req, res, next) => {
    const { wing_id } = req.body;

    if (!wing_id) {
        next({message: "Wing with that ID not found", status: 400});
    } else {
        const wing = await findUserWingsByWingsID(wing_id);
        if (!wing) {
            next({message: "Wing with that ID not found", status: 400});
        } else if (wing.user_id !== req.decodedToken.user_id) {
            next({message: "This is not your wing", status: 403});
        } else {
            next();
        }
    }
};

module.exports = {
    checkLoginCredentials,
    checkUsernameUnique,
    checkUsernameExists,
    checkNewUserPayload,
    formatNewUserPayload,
    checkNewWingPayload,
    checkUserWingExists
};
