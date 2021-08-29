const db = require('../../data/db-config');

function findById(id) {
    return db("wings")
        .where("user_id", id)
        .select("wing_id", "flavor", "location", "amount");
}

function totalWings(id) {
    return db("wings")
        .where("user_id", id)
        .select("amount")
        .sum("amount").as("total")
}

// function findUserWingsByWingsID(user_plant_id){
//     return db("user_plants as up")
//         .join("species as sp", "up.species_id", "sp.species_id")
//         .join("water_schedule as ws", "sp.water_id", "ws.water_id")
//         .where("up.user_plant_id", user_plant_id)
//         .select("up.user_plant_id", "up.plant_nickname", "up.plant_location", "up.notes", "up.water_day", "sp.species_id", "sp.plant_name", "sp.plant_scientific_name", "sp.plant_image", "ws.water_schedule", "up.user_id")
//         .first();
// }

// async function addPlant(newPlant){
//     const [user_plant_id] = await db('user_plants')
//         .insert(newPlant, "user_plant_id");
//     // finds plant by plant id
//     return findUserWingsByWingsID(user_plant_id);
// }


// async function updatePlant(user_plant_id,updatedPlant){
//     await db('user_plants')
//         .where("user_plant_id", user_plant_id)
//         .update(updatedPlant);
//     return findUserWingsByWingsID(user_plant_id);
// }

// function del(user_plant_id){
//     return db('user_plants')
//         .where({user_plant_id})
//         .del();
// }

module.exports = {
    findById,
    totalWings,
    // addPlant,
    // updatePlant,
    // del,
    // findUserWingsByWingsID
};