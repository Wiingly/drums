const { getBy } = require("../users/model");

const checkUsernameExists = (req, res, next) => {
  getBy({ username: req.body.username })
    .then(([user]) => {
      if (user) {
        req.foundUser = user;
        next();
      } else {
        next({ status: 404, message: "username not found" });
      }
    })
    .catch(next);
};

module.exports = checkUsernameExists;