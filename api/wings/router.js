const express = require('express')
const router = express.Router()
const Wing = require('./model')

// const {
//     validateWing,
//   } = require('../middleware/middleware')

router.get('/', async (req, res, next) => {
    try {
        const wings = await Wing.get()
        const newWings = wings.map(w => ({...w, wings_eaten: !!w.wings_eaten}))
        res.json(newWings)
    } catch (err) {
        next(err)
    }
})

router.post('/', // validateWing, 
(req, res, next) => {
    const wings = req.body
    Wing.create(wings)
      .then(newWings => {
        res.status(201).json({...newWings, wings_eaten: !!newWings.wings_eaten})
      })
      .catch(next)
  });

module.exports = router