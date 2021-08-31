const db = require('../../data/db-config');

function findById(id) {
    return db("wings")
        .where("user_id", id)
        .select("wing_id", "flavor", "location", "amount");
}

function totalWings(id) {
    return db("wings")
        .where("user_id", id)
        .sum({total: "amount"})
}

async function addWing(newWing){
    const [wing_id] = await db('wings')
        .insert(newWing, "wing_id");
    return findById(wing_id);
}


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
    addWing,
    // updatePlant,
    // del,
    // findUserWingsByWingsID
};