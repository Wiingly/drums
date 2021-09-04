const router = require("express").Router();
const restricted = require('../middleware/restricted.js');
const Follower = require("./model");

router.get('/', restricted, async (req, res, next) => {
    const { user_id } = req.decodedToken;
    // array of ids
    // userID = [{userID: id}]
    // usernames
    // userWingtotal
    try {
        const followerIds = await Follower.findById(user_id);
        const followers =  await Promise.all(followerIds.map(async follower => {
            const profile = await Follower.findUsername(follower.user2_id);
            const wingStats = await Follower.totalWings(follower.user2_id);
        return {
            // ...follower,
            ...profile,
            ...wingStats,
        }
        }))
        res.json(followers)
        console.log(followers)
    }
    catch(err) {
        next(err)
    }
})

// const { user_id } = req.decodedToken;
// // array of ids
// // userID = [{userID: id}]
// // usernames
// // userWingtotal
// try {
//     const flw = await Follower.findById(user_id)
//     const usr = flw.map(u => {
//         return u.user2_id 
//     })
//     console.log(usr)
//     const mp = usr.map(p => {
//         console.log(p)
//         return p
//     })
//     console.log(mp)
//     const username = await Follower.findUsername(mp)
//     console.log(username)
// }

// catch(err) {
//     next(err)
// }
// })

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
