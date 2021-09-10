const router = require("express").Router();
const restricted = require('../middleware/restricted.js');
const { OnlyFollowOnce } = require('../middleware/middleware.js')
const Follower = require("./model");

router.get('/', restricted, async (req, res, next) => {
    const { user_id } = req.decodedToken;
    try {
        const followerIds = await Follower.findById(user_id);
        console.log(followerIds)
        const followers =  await Promise.all(followerIds.map(async follower => {
            const username = await Follower.findUsername(follower.user2_id);
            const wingStats = await Follower.totalWings(follower.user2_id);
        return {
            ...follower,
            ... { username },
            ... { wingStats },
        }
        }))
        res.json(followers)
    }
    catch(err) {
        next(err)
    }
})


router.post('/', restricted, OnlyFollowOnce, async (req, res, next) => {
    const newFollow = { ...req.body, user1_id: req.decodedToken.user_id }
    try {
        const follow = await Follower.Follow(newFollow);
        res.status(200).json(follow);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
