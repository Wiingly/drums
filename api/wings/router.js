const router = require("express").Router();
const { restrict } = require("../middleware");
// const { validateWing } = require("../middleware/validation");
const Wing = require("./model");

router.use(restrict);

// const { checkWingExists } = require("../middleware/check-wing-exists");
//////////Wing//////////

router.get("/", (req, res, next) => {
  const user_id = req.decodedJwt.sub;
  Wing.getById(user_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get('/:wing_id', async (req, res, next) => { //eslint-disable-line
  Wing.getById(req.params.wing_id)
    .then(w => {
      res.status(200).json(w)
    })
})

router.post('/', // validateWing, 
(req, res, next) => {
    const wings = req.body
    Wing.create(wings)
      .then(newWings => {
        res.status(201).json({...newWings})
      })
      .catch(next)
  });

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    customMessage: 'you deserve only tyson wings boiled in water for causing this issue',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router