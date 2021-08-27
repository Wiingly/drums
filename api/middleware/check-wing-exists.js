const { getBy: getWing } = require("../wings/model");

exports.checkWingExists = (req, res, next) => {
  const wing_id = parseInt(req.params.wing_id);
  isNaN(wing_id)
    ? next({
        status: 404,
        message: `wing with wing_id ${wing_id} not found`,
      })
    : getWing(req.decodedJwt.sub, { wing_id: wing_id })
        .then(([wing]) => {
          if (wing) {
            req.wing = wing;
            next();
          } else {
            next({
              status: 404,
              message: `wing with wing_id ${wing_id} not found`,
            });
          }
        })
        .catch(next);
};