const router = require("express").Router();
const Users = require('./model')

  router.get('/', (req, res, next) => {
    const { user_id } = req.params
  
    Users.getById(user_id)
      .then(user => {
        res.json(user)
      })
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    Users.add(req.body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  })
    

  router.put("/:user_id", async (req, res, next) => {
    try {
        const data = await Users.update(req.params.user_id, req.body)
        res.json(data)
      } catch (err) {
        next(err)
      }
    
  });

  router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
      customMessage: 'Something went wrong inside the users router'
    });
  });

module.exports = router;