const router = require("express").Router();
const Users = require("../users/model");
const {
  checkUsernameAvailable: checkAvailable,
  checkUsernameExists: checkExists,
} = require("../middleware/index");

const {
  validateRegistration,
  validateUser,
} = require("../middleware/validation");

const bcrypt = require("bcrypt");
const { BCRYPT_ROUNDS } = require("../../utils/env-fallbacks");
const { buildToken } = require("../../utils/build-token");

router.post(
  "/register",
  validateRegistration,
  checkAvailable,
  (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);

    user.password = hash;

    Users.add(user)
      .then((newUser) => {
        const token = buildToken(newUser);
        res.status(201).json(token);
      })
      .catch(next);
  }
);

router.post("/login", validateUser, checkExists, (req, res, next) => {
  let { password } = req.body;

  const { password: hash } = req.foundUser;

  if (bcrypt.compareSync(password, hash)) {
    const token = buildToken(req.foundUser);
    res.status(200).json(token);
  } else {
    next({ status: 401, message: "invalid credentials" });
  }
});

module.exports = router;