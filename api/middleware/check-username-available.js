const { getBy } = require("../users/model");

const checkUsernameAvailable = (req, res, next) => {
  getBy({ username: req.body.username })
    .then(([user]) => {
      user ? res.status(400).json({ message: "username unavailable" }) : next();
    })
    .catch(next);
};

module.exports = checkUsernameAvailable;