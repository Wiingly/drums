const router = require("express").Router();
const restricted = require('../middleware/restricted.js');
const Wings = require("./model");
const { checkNewWingPayload,  } = require('../middleware/middleware.js');


// [GET] - /api/wings
router.get("/", restricted, (req, res, next) => {
    const { user_id } = req.decodedToken;
    Wings.findById(user_id)
        .then(wings => res.status(200).json(wings))
        .catch(next);
});

router.get("/total", restricted, (req, res, next) => {
    const { user_id } = req.decodedToken;
    Wings.totalWings(user_id)
        .then(wings => res.status(200).json(wings))
        .catch(next);
});


// [POST] - /api/wings
router.post('/', checkNewWingPayload, restricted, async (req, res, next) => {
    const newWing = { ...req.body, user_id: req.decodedToken.user_id };
    try {
        const wing = await Wings.addWing(newWing);
        res.status(200).json(wing);
    } catch (err) {
        next(err);
    }
});

// // [PUT] - /api/wings
// router.put('/', checkNewUserWingPayload, restricted, checkUserWingExists, async (req, res, next) => {
//     const wing_id = req.body.wing_id;
//     const wingInfo = {
//         user_id: req.decodedToken.user_id,
//         flavor: req.body.flavor,
//         location: req.body.location,
//     };


//     try {
//         const updatedWing = await Wings.updateWing(wing_id, wingInfo);
//         res.status(200).json(updatedWing);

//     } catch (err) {
//         next(err);
//     }
// });

// // [DELETE] - /api/wings

// router.delete('/', restricted, async (req, res, next) => {
//     const { wing_id } = req.body;
//     try {
//         await Wings.del(wing_id);
//         res.status(200).json({ message: 'wing deleted' });
//     } catch (err) {
//         next(err);
//     }
// });


module.exports = router;