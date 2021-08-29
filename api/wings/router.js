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
// router.put('/', checkNewUserPlantPayload, restricted, checkUserPlantExists, async (req, res, next) => {
//     const user_plant_id = req.body.user_plant_id;
//     const plantInfo = {
//         user_id: req.decodedToken.user_id,
//         plant_nickname: req.body.plant_nickname,
//         water_day: req.body.water_day,
//         notes: req.body.notes,
//         plant_location: req.body.plant_location,
//         species_id: req.body.species_id
//     };


//     try {
//         const updatedPlant = await UserPlants.updatePlant(user_plant_id, plantInfo);
//         res.status(200).json(updatedPlant);

//     } catch (err) {
//         next(err);
//     }
// });

// // [DELETE] - /api/wings

// router.delete('/', restricted, async (req, res, next) => {
//     const { user_plant_id } = req.body;
//     try {
//         await UserPlants.del(user_plant_id);
//         res.status(200).json({ message: 'plant deleted' });
//     } catch (err) {
//         next(err);
//     }
// });


module.exports = router;