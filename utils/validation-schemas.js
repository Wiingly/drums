const yup = require("yup");

exports.registration = yup.object({
  username: yup
    .string()
    .trim()
    .required("username required")
    .min(2, "username must be at least 2 characters long")
    .max(140, "username must be at most 140 characters long"),

  password: yup
    .string()
    .required("password required")
    .min(4, "password must be at least 8 characters long")
    .max(140, "password must be at most 140 characters long"),

});

exports.login = yup.object({
  username: yup
    .string()
    .trim()
    .required("username required"),

  password: yup
    .string()
    .required("password required"),
});