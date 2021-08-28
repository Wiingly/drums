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
        case (!username || !username.match(/^\S+@\S+\.\S+$/)):
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

// const checkNewUserPlantPayload = (req, res, next) => {
//     const { plant_nickname, water_day, species_id } = req.body;
//     if (!species_id) {
//         next({status: 400, message: "IDK what you're talking about. What plant species did you want to add again?"});
//     } else if (!plant_nickname) {
//         next({ status: 400, message: 'Please provide a nickname for you lil green friend' });
//     } else if (plant_nickname.length > 255) {
//         next({ status: 400, message: 'Sorry the International Plant Union has restricted plant names to 255 characters or less' });
//     } else if (!water_day) {
//         next({ status: 400, message: 'Please provide a day to begin watering your plant' });
//     } else if (typeof water_day !== 'number') {
//         next({ status: 400, message: 'Sorry water days only identify as numbers' });
//     } else if (water_day < 1 || water_day > 7) {
//         next({status: 400, message: "What are you making up days now? Please enter a water day between 1-7"});
//     } else {
//         req.body.plant_nickname = plant_nickname.trim();
//         req.body.water_day = water_day;
//         next();
//     }
// };

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
    // checkNewUserWingPayload,
    checkUserWingExists
};
