const {
    wing: wingSchema,
    registration: registrationSchema,
    login: loginSchema,
  } = require("../../utils/validation-schemas");
  
  exports.validateWing = async (req, _res, next) => {
    if (!req.body) {
      return next({ status: 400, message: "cannot add empty wing" });
    }
    try {
      const validWing = await wingSchema.validate(req.body, {
        stripUnknown: true,
      });
      req.body = validWing;
      next();
    } catch (err) {
      next({ status: 400, message: err.message });
    }
  };
  
  exports.validateRegistration = async (req, _res, next) => {
    if (!req.body) {
      return next({
        status: 400,
        message: "username, password required",
      });
    }
    try {
      const validRegistration = await registrationSchema.validate(req.body, {
        stripUnknown: true,
      });
      req.body = validRegistration;
      next();
    } catch (err) {
      next({ status: 400, message: err.message });
    }
  };
  
  exports.validateUser = async (req, _res, next) => {
    if (!req.body) {
      return next({
        status: 400,
        message: "username, password required",
      });
    }
    try {
      const validLogin = await loginSchema.validate(req.body, {
        stripUnknown: true,
      });
      req.body = validLogin;
      next();
    } catch (err) {
      next({ status: 400, message: err.message });
    }
  };