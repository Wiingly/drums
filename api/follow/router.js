const router = require("express").Router();
const restricted = require('../middleware/restricted.js');
const Follower = require("./model");

router.get('/', restricted, (req, res, next) => {
    const { user_id } = req.decodedToken;
    console.log(req)
    // array of ids
    // userID = [{userID: id}]
    // userWingtotal
    Follower.findById(user_id)
        .then(userID => {
        // userID.map{}
        res.json(userID)
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    const newFollow = { ...req.body, user1_id: req.decodedToken.user_id };
    try {
        const follow = await Follower.Follow(newFollow);
        res.status(200).json(follow);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
