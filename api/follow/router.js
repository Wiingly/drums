const router = require("express").Router();
// const restricted = require('../middleware/restricted.js');
const Follower = require("./model");

router.get('/', (req, res, next) => {
    const { user_id } = { user1_id: req.decodedToken.user_id };

    Follower.findById(user_id)
        .then(user => {
        res.json(user)
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    const newFriend = { ...req.body, user_id: req.decodedToken.user_id };
    try {
        const friend = await Follower.addFriend(newFriend);
        res.status(200).json(friend);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
