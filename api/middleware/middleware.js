
function validateWing(req, res, next) {
    console.log(req.body)
    const something = req.body
    if (!something.wing_name) {
      res.status(400).json({
        message: 'missing required fields',
      })
    } else {
      req.wing = something
      next()
    }
  }

  // function validateUser(req, res, next) {
  //   console.log(req.body)
  //   const something = req.body
  //   if (!something.resource_name) {
  //     res.status(400).json({
  //       message: 'missing required fields',
  //     })
  //   } else {
  //     req.wing = something
  //     next()
  //   }
  // }

  module.exports = {
    validateWing,
  }