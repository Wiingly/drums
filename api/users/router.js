const router = require('express').Router();
const bcrypt = require('bcryptjs');
const restricted = require('../middleware/restricted');
const Users = require('./model');

router.get('/', restricted, (req, res, next) => {
    Users.findByFilter({user_id: req.decodedToken.user_id})
        .then(filteredUser => {
            res.status(200).json(filteredUser);
        })
        .catch(next);
});

router.put('/', async (req, res, next) => {
    if (req.body.password) {
        let {password} = req.body;

        //const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = await bcrypt.hashSync(password, 4);
    
        req.body.password = hash;
    }
    Users.update(req.decodedToken.user_id, req.body)
    .then(() => {
        res.status(201).json({message: `Success`});
    })
    .catch(next);
});

module.exports = router;